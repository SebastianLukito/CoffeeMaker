import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db, firebaseReady } from "./firebase-client.js";
import {
  computeFlavorProfile,
  drawFlavorRadarOnCanvas,
  flavorMetrics,
  normalizeFlavorProfile
} from "./flavor-radar-core.js";

const welcomeHeadingEl = document.getElementById("welcomeHeading");
const homeIntroEl = document.getElementById("homeIntro");
const recipeCountEl = document.getElementById("recipeCount");
const lastUpdatedEl = document.getElementById("lastUpdated");
const homeStatusEl = document.getElementById("homeStatus");
const recentRecipeListEl = document.getElementById("recentRecipeList");

let radarRedrawTimer = null;
let homeRecipes = [];

function formatTimestamp(timestamp) {
  if (!timestamp || typeof timestamp.toDate !== "function") {
    return "-";
  }

  return timestamp.toDate().toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function updateStatus(text, tone = "info") {
  if (!homeStatusEl) {
    return;
  }

  homeStatusEl.textContent = text;
  homeStatusEl.dataset.tone = tone;
}

function toFiniteNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

const coffeeLabelToKey = {
  "java robusta": "java-robusta",
  "java arabica": "java-arabica",
  "java excelsa": "java-excelsa",
  "java liberica": "java-liberica",
  "javanese blend": "blend"
};

function normalizeCoffeeType(recipe) {
  if (recipe?.coffeeType) {
    return recipe.coffeeType;
  }

  const label = String(recipe?.coffeeLabel || "").trim().toLowerCase();
  return coffeeLabelToKey[label] || "custom";
}

function resolveFlavorProfileForRecipe(recipe) {
  const preset = normalizeFlavorProfile(recipe?.flavorProfile);
  if (preset) {
    return preset;
  }

  const settings = recipe?.settings || {};
  return computeFlavorProfile({
    coffeeType: normalizeCoffeeType(recipe),
    brewTool: recipe?.brewTool || "v60",
    values: settings,
    blendRatio: recipe?.blendRatio || settings.blendRatio
  });
}

function formatMl(value) {
  const parsed = toFiniteNumber(value);
  if (!Number.isFinite(parsed)) {
    return "-";
  }
  return `${Math.round(parsed)} ml`;
}

function resolveRecipeWaterAmount(recipe) {
  const settings = recipe.settings || {};
  const manualWater = toFiniteNumber(recipe.manualWater);
  if (Number.isFinite(manualWater) && manualWater > 0) {
    return manualWater;
  }

  const dose = toFiniteNumber(settings.dose);
  if (!Number.isFinite(dose) || dose <= 0) {
    return null;
  }

  if (recipe.brewTool === "espresso") {
    const brewRatio = toFiniteNumber(settings.brewRatio);
    return Number.isFinite(brewRatio) ? dose * brewRatio : null;
  }

  const ratio = toFiniteNumber(settings.ratio);
  return Number.isFinite(ratio) ? dose * ratio : null;
}

function resolvePrimaryTimeLabel(recipe) {
  const settings = recipe.settings || {};
  if (settings.targetTime) {
    return settings.targetTime;
  }
  if (settings.steepTime) {
    return settings.steepTime;
  }
  if (settings.brewTime) {
    return settings.brewTime;
  }
  if (settings.shotTime) {
    return `${settings.shotTime} detik`;
  }
  if (settings.steepTimeCold) {
    return `${settings.steepTimeCold} jam`;
  }
  if (settings.dripTime) {
    return `${settings.dripTime} jam`;
  }
  return "-";
}

function getBrewProfileRows(recipe) {
  const settings = recipe.settings || {};
  const extraction = recipe.extractionEstimate || {};
  const totalWater = resolveRecipeWaterAmount(recipe);

  return [
    { label: "Kopi", value: recipe.coffeeLabel || recipe.coffeeType || "-" },
    { label: "Metode", value: recipe.brewToolLabel || recipe.brewTool || "-" },
    { label: "Proses", value: recipe.processLabel || settings.processMethod || "-" },
    { label: "Varietas", value: recipe.varietalLabel || settings.varietal || "-" },
    { label: "Gilingan", value: settings.grind || "-" },
    { label: "Roast", value: settings.roastLevel || "-" },
    { label: "Suhu air", value: Number.isFinite(toFiniteNumber(settings.waterTemp)) ? `${settings.waterTemp}°C` : "-" },
    { label: "Total air", value: formatMl(totalWater) },
    { label: "Extraction Index", value: Number.isFinite(toFiniteNumber(extraction.extractionIndex)) ? `${extraction.extractionIndex}/100` : "-" },
    { label: "Extraction Yield", value: Number.isFinite(toFiniteNumber(extraction.eyPercent)) ? `${extraction.eyPercent}%` : "-" },
    { label: "Total Dissolved Solids", value: Number.isFinite(toFiniteNumber(extraction.tdsPercent)) ? `${extraction.tdsPercent}%` : "-" }
  ];
}

function splitNarrativeLines(recipe) {
  const sourceText = String(recipe.flavorNarrative || recipe.notes || "Tanpa catatan tambahan.");
  const normalized = sourceText.replace(/\r/g, "\n");
  const byLine = normalized.split(/\n+/).map(line => line.trim()).filter(Boolean);

  const expanded = byLine.flatMap(line => {
    if (line.includes(" - ")) {
      return line.split(/\s+-\s+/).map(part => part.trim()).filter(Boolean);
    }
    return [line];
  });

  return expanded
    .map(line => line.replace(/^[-\u2022]\s*/, "").trim())
    .filter(Boolean);
}

function drawRecipeRadar(canvas, profile) {
  drawFlavorRadarOnCanvas(canvas, profile);
}

function queueRadarRedraw() {
  if (radarRedrawTimer) {
    clearTimeout(radarRedrawTimer);
  }

  radarRedrawTimer = setTimeout(() => {
    recentRecipeListEl?.querySelectorAll(".recent-radar-canvas").forEach(canvas => {
      const recipeId = canvas.dataset.recipeId;
      const recipeData = homeRecipes.find(item => item.id === recipeId);
      const profile = recipeData ? resolveFlavorProfileForRecipe(recipeData) : null;
      if (profile) {
        drawRecipeRadar(canvas, profile);
      }
      if (recipeId) {
        canvas.dataset.recipeId = recipeId;
      }
    });
    radarRedrawTimer = null;
  }, 90);
}

function sanitizeFileName(text) {
  const base = String(text || "resep").toLowerCase();
  const normalized = base
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return normalized || "resep";
}

function buildExportFileName(recipe, extension) {
  const dateLabel = new Date().toISOString().slice(0, 10);
  const titleLabel = sanitizeFileName(recipe.title || "resep-home");
  return `${titleLabel}-${dateLabel}.${extension}`;
}

function getHtml2Canvas() {
  if (typeof window.html2canvas === "function") {
    return window.html2canvas;
  }
  throw new Error("Library export gambar belum siap. Cek koneksi internet lalu refresh halaman.");
}

function getJsPdfClass() {
  const jsPdfClass = window.jspdf?.jsPDF;
  if (typeof jsPdfClass === "function") {
    return jsPdfClass;
  }
  throw new Error("Library PDF belum siap. Cek koneksi internet lalu refresh halaman.");
}

function triggerDownload(dataUrl, filename) {
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
}

async function captureRecipeCardCanvas(cardElement) {
  const html2canvas = getHtml2Canvas();
  cardElement.classList.add("is-exporting");

  try {
    return await html2canvas(cardElement, {
      backgroundColor: "#f7f2ea",
      scale: Math.max(2, Math.min(3, window.devicePixelRatio || 1.5)),
      useCORS: true,
      logging: false,
      scrollX: -window.scrollX,
      scrollY: -window.scrollY
    });
  } finally {
    cardElement.classList.remove("is-exporting");
  }
}

function exportCanvasAsPdf(canvas, filename) {
  const JsPdf = getJsPdfClass();
  const pdf = new JsPdf({ unit: "mm", format: "a4", orientation: "portrait" });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const imageData = canvas.toDataURL("image/png");

  const renderedWidth = pageWidth;
  const renderedHeight = (canvas.height * renderedWidth) / canvas.width;

  let remainingHeight = renderedHeight;
  let yPosition = 0;

  pdf.addImage(imageData, "PNG", 0, yPosition, renderedWidth, renderedHeight, undefined, "FAST");
  remainingHeight -= pageHeight;

  while (remainingHeight > 0) {
    yPosition = remainingHeight - renderedHeight;
    pdf.addPage();
    pdf.addImage(imageData, "PNG", 0, yPosition, renderedWidth, renderedHeight, undefined, "FAST");
    remainingHeight -= pageHeight;
  }

  pdf.save(filename);
}

function exportCanvasAsJpg(canvas, filename) {
  triggerDownload(canvas.toDataURL("image/jpeg", 0.92), filename);
}

async function exportRecipeCard(cardElement, recipe, format, buttonElement, allActionButtons = []) {
  const originalLabel = buttonElement.textContent;
  const controls = allActionButtons.length > 0 ? allActionButtons : [buttonElement];
  controls.forEach(btn => {
    btn.disabled = true;
  });
  buttonElement.textContent = "Menyiapkan...";

  try {
    const canvas = await captureRecipeCardCanvas(cardElement);

    if (format === "pdf") {
      exportCanvasAsPdf(canvas, buildExportFileName(recipe, "pdf"));
      updateStatus("File PDF berhasil diunduh.", "success");
    } else {
      exportCanvasAsJpg(canvas, buildExportFileName(recipe, "jpg"));
      updateStatus("Gambar JPG berhasil diunduh.", "success");
    }
  } catch (error) {
    updateStatus(error?.message || "Gagal menyiapkan file unduhan.", "error");
  } finally {
    controls.forEach(btn => {
      btn.disabled = false;
    });
    buttonElement.textContent = originalLabel;
  }
}

function createRecipeCard(recipe) {
  const card = document.createElement("article");
  card.className = "recent-recipe-item";

  const head = document.createElement("div");
  head.className = "recent-recipe-item-head";

  const title = document.createElement("h4");
  title.textContent = recipe.title || "Resep tanpa judul";

  const updated = document.createElement("span");
  updated.className = "tag";
  updated.textContent = formatTimestamp(recipe.updatedAt || recipe.createdAt);

  head.append(title, updated);

  const badges = document.createElement("div");
  badges.className = "recent-recipe-badges";

  const coffeeBadge = document.createElement("span");
  coffeeBadge.className = "recent-recipe-badge coffee";
  coffeeBadge.textContent = recipe.coffeeLabel || recipe.coffeeType || "Kopi";

  const toolBadge = document.createElement("span");
  toolBadge.className = "recent-recipe-badge tool";
  toolBadge.textContent = recipe.brewToolLabel || recipe.brewTool || "Brew Tool";

  badges.append(coffeeBadge, toolBadge);

  const topMetaRow = document.createElement("div");
  topMetaRow.className = "recent-recipe-meta-row";

  const toolbar = document.createElement("div");
  toolbar.className = "recent-recipe-toolbar";

  const saveJpgBtn = document.createElement("button");
  saveJpgBtn.type = "button";
  saveJpgBtn.className = "recent-export-btn";
  saveJpgBtn.textContent = "Save to JPG";

  const savePdfBtn = document.createElement("button");
  savePdfBtn.type = "button";
  savePdfBtn.className = "recent-export-btn";
  savePdfBtn.textContent = "Save to PDF";

  const exportButtons = [saveJpgBtn, savePdfBtn];
  saveJpgBtn.addEventListener("click", () => {
    exportRecipeCard(card, recipe, "jpg", saveJpgBtn, exportButtons);
  });
  savePdfBtn.addEventListener("click", () => {
    exportRecipeCard(card, recipe, "pdf", savePdfBtn, exportButtons);
  });

  toolbar.append(saveJpgBtn, savePdfBtn);
  topMetaRow.append(badges, toolbar);

  const layout = document.createElement("div");
  layout.className = "recent-recipe-layout";

  const mainPanel = document.createElement("section");
  mainPanel.className = "recent-recipe-main";

  const note = document.createElement("p");
  note.className = "recent-recipe-note-title";
  note.textContent = "Profil rasa ringkas";

  const noteList = document.createElement("ul");
  noteList.className = "recent-recipe-narrative";
  const narrativeLines = splitNarrativeLines(recipe);
  if (narrativeLines.length === 0) {
    const fallbackItem = document.createElement("li");
    fallbackItem.textContent = "Tanpa catatan tambahan.";
    noteList.append(fallbackItem);
  } else {
    narrativeLines.slice(0, 6).forEach(line => {
      const item = document.createElement("li");
      item.textContent = line;
      noteList.append(item);
    });
  }

  const stepTitle = document.createElement("h5");
  stepTitle.className = "recent-subtitle";
  stepTitle.textContent = "Step by Step";

  const steps = Array.isArray(recipe.steps) ? recipe.steps : [];
  const brewSteps = steps.filter(step => String(step.title || "").toLowerCase() !== "catatan rasa");
  const stepList = document.createElement("ul");
  stepList.className = "recent-recipe-steps";
  if (brewSteps.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.textContent = "Langkah belum tersedia.";
    stepList.append(emptyItem);
  } else {
    brewSteps.slice(0, 6).forEach((step, stepIndex) => {
      const item = document.createElement("li");
      const text = step.desc
        ? `${step.title || `Step ${stepIndex + 1}`}: ${step.desc}`
        : String(step.title || `Step ${stepIndex + 1}`);
      item.textContent = text;
      stepList.append(item);
    });
  }

  mainPanel.append(note, noteList, stepTitle, stepList);

  const asidePanel = document.createElement("aside");
  asidePanel.className = "recent-recipe-aside";

  const profileTitle = document.createElement("h5");
  profileTitle.className = "recent-subtitle";
  profileTitle.textContent = "Brew Profile";

  const profileList = document.createElement("div");
  profileList.className = "recent-profile-list";
  getBrewProfileRows(recipe).forEach(row => {
    const stat = document.createElement("div");
    stat.className = "recent-profile-row";

    const label = document.createElement("span");
    label.textContent = row.label;

    const value = document.createElement("span");
    value.className = "recent-profile-tag";
    value.textContent = row.value || "-";

    stat.append(label, value);
    profileList.append(stat);
  });

  const radarTitle = document.createElement("h5");
  radarTitle.className = "recent-subtitle";
  radarTitle.textContent = "Radar Chart";

  const radarCard = document.createElement("div");
  radarCard.className = "recent-radar-card";
  const radarCanvas = document.createElement("canvas");
  radarCanvas.className = "recent-radar-canvas";
  radarCanvas.dataset.recipeId = recipe.id;
  radarCanvas.setAttribute("aria-label", "Radar chart profil rasa");
  radarCard.append(radarCanvas);

  asidePanel.append(profileTitle, profileList, radarTitle, radarCard);
  layout.append(mainPanel, asidePanel);

  card.append(head, topMetaRow, layout);

  drawRecipeRadar(radarCanvas, resolveFlavorProfileForRecipe(recipe));
  return card;
}

async function loadAccountRecipes(uid) {
  if (!db) {
    updateStatus("Firestore belum siap. Cek firebase-config.js.", "warning");
    return;
  }

  updateStatus("Memuat resep akun kamu...", "info");

  try {
    const baseCollection = collection(db, "users", uid, "recipes");
    const latestQuery = query(baseCollection, orderBy("updatedAt", "desc"), limit(6));

    const [allSnapshot, latestSnapshot] = await Promise.all([
      getDocs(baseCollection),
      getDocs(latestQuery)
    ]);

    const latestRecipes = latestSnapshot.docs.map(docItem => ({ id: docItem.id, ...docItem.data() }));
    homeRecipes = latestRecipes;

    recipeCountEl.textContent = String(allSnapshot.size);
    lastUpdatedEl.textContent = latestRecipes.length > 0
      ? formatTimestamp(latestRecipes[0].updatedAt || latestRecipes[0].createdAt)
      : "-";

    recentRecipeListEl.innerHTML = "";

    if (latestRecipes.length === 0) {
      homeRecipes = [];
      updateStatus("Belum ada resep tersimpan. Coba racik di halaman Brew Builder lalu klik simpan.", "warning");
      return;
    }

    latestRecipes.forEach(recipe => {
      recentRecipeListEl.append(createRecipeCard(recipe));
    });

    queueRadarRedraw();

    updateStatus("Resep terbaru berhasil dimuat.", "success");
  } catch (error) {
    updateStatus(error.message || "Gagal memuat resep.", "error");
  }
}

async function resolveUsername(user) {
  if (!user) {
    return "";
  }

  const displayName = (user.displayName || "").trim();
  if (displayName && !displayName.includes("@")) {
    return displayName;
  }

  if (db) {
    try {
      const profileSnap = await getDoc(doc(db, "users", user.uid));
      if (profileSnap.exists()) {
        const profile = profileSnap.data() || {};
        const username = String(profile.username || "").trim();
        if (username) {
          return username;
        }
      }
    } catch {
      // Fallback to email local-part if profile read fails.
    }
  }

  if (user.email) {
    return user.email.split("@")[0];
  }

  return "Pengguna";
}

function bootstrapHomePage() {
  if (!firebaseReady || !auth) {
    if (welcomeHeadingEl) {
      welcomeHeadingEl.textContent = "Firebase belum dikonfigurasi.";
    }
    if (homeIntroEl) {
      homeIntroEl.textContent = "Isi firebase-config.js sesuai project kamu, lalu refresh halaman.";
    }
    updateStatus("Firestore belum aktif. Lihat panduan di FIREBASE_SETUP.md.", "warning");
    return;
  }

  window.addEventListener("resize", queueRadarRedraw);

  onAuthStateChanged(auth, async user => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    const username = await resolveUsername(user);

    if (welcomeHeadingEl) {
      welcomeHeadingEl.textContent = `Selamat datang, ${username}.`;
    }
    if (homeIntroEl) {
      homeIntroEl.textContent = "Di sini kamu bisa lihat ringkasan resep personal sebelum masuk ke dashboard penuh.";
    }

    await loadAccountRecipes(user.uid);
  });
}

bootstrapHomePage();
