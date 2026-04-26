import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db, firebaseReady } from "./firebase-client.js";

const dashboardMessageEl = document.getElementById("dashboardMessage");
const recipeListEl = document.getElementById("recipeList");
const statRecipeTotalEl = document.getElementById("statRecipeTotal");
const statLastUpdateEl = document.getElementById("statLastUpdate");

let currentUser = null;
let recipes = [];
let recipeUnsubscribe = null;
let radarRedrawTimer = null;

const flavorMetrics = [
  { key: "acidity", label: "Acidity" },
  { key: "body", label: "Body" },
  { key: "sweetness", label: "Sweetness" },
  { key: "bitterness", label: "Bitterness" },
  { key: "aroma", label: "Aroma" }
];

function setDashboardMessage(message, tone = "info") {
  if (!dashboardMessageEl) {
    return;
  }

  dashboardMessageEl.textContent = message;
  dashboardMessageEl.dataset.tone = tone;
}

function formatTimestamp(timestamp) {
  if (!timestamp || typeof timestamp.toDate !== "function") {
    return "-";
  }

  return timestamp.toDate().toLocaleString("id-ID", {
    dateStyle: "medium",
    timeStyle: "short"
  });
}

function updateDashboardStats() {
  if (statRecipeTotalEl) {
    statRecipeTotalEl.textContent = String(recipes.length);
  }

  if (statLastUpdateEl) {
    const latestRecipe = recipes.length > 0 ? recipes[0] : null;
    statLastUpdateEl.textContent = latestRecipe
      ? formatTimestamp(latestRecipe.updatedAt || latestRecipe.createdAt)
      : "-";
  }
}

function toFiniteNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
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
    { label: "Mineral", value: settings.waterHardness || "-" },
    { label: "Agitasi", value: settings.agitation || "-" },
    { label: "Target waktu", value: resolvePrimaryTimeLabel(recipe) },
    { label: "Total air", value: formatMl(totalWater) },
    { label: "Extraction Index", value: Number.isFinite(toFiniteNumber(extraction.extractionIndex)) ? `${extraction.extractionIndex}/100` : "-" },
    { label: "Extraction Yield", value: Number.isFinite(toFiniteNumber(extraction.eyPercent)) ? `${extraction.eyPercent}%` : "-" },
    { label: "Total Dissolved Solids", value: Number.isFinite(toFiniteNumber(extraction.tdsPercent)) ? `${extraction.tdsPercent}%` : "-" },
    { label: "Status ekstraksi", value: extraction.statusLabel || "-" }
  ];
}

function splitNarrativeLines(recipe) {
  const sourceText = String(recipe.notes || recipe.flavorNarrative || "Tanpa catatan tambahan.");
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

function buildRadarCanvas(recipeId) {
  const canvas = document.createElement("canvas");
  canvas.className = "dashboard-radar-canvas";
  canvas.dataset.recipeId = recipeId;
  canvas.width = 320;
  canvas.height = 250;
  canvas.setAttribute("aria-label", "Radar chart profil rasa");
  return canvas;
}

function drawRecipeRadar(canvas, profile) {
  if (!canvas || !profile) {
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const width = Math.max(260, Math.round(rect.width || canvas.clientWidth || 320));
  const height = Math.max(220, Math.round(rect.height || canvas.clientHeight || 250));
  const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

  canvas.width = Math.round(width * dpr);
  canvas.height = Math.round(height * dpr);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    return;
  }

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);

  const centerX = width / 2;
  const centerY = height / 2 + 6;
  const maxRadius = Math.min(width, height) * 0.36;
  const points = flavorMetrics.length;

  ctx.strokeStyle = "rgba(34, 27, 22, 0.14)";
  ctx.lineWidth = 1;
  for (let level = 1; level <= 5; level += 1) {
    const radius = (maxRadius * level) / 5;
    ctx.beginPath();
    for (let i = 0; i < points; i += 1) {
      const angle = -Math.PI / 2 + (i * Math.PI * 2) / points;
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.closePath();
    ctx.stroke();
  }

  for (let i = 0; i < points; i += 1) {
    const angle = -Math.PI / 2 + (i * Math.PI * 2) / points;
    const x = centerX + Math.cos(angle) * maxRadius;
    const y = centerY + Math.sin(angle) * maxRadius;

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    const labelRadius = maxRadius + 18;
    const labelX = centerX + Math.cos(angle) * labelRadius;
    const labelY = centerY + Math.sin(angle) * labelRadius;
    ctx.fillStyle = "#5f4f42";
    ctx.font = "600 13px 'Space Grotesk', sans-serif";
    ctx.textAlign = labelX < centerX - 6 ? "right" : labelX > centerX + 6 ? "left" : "center";
    ctx.textBaseline = labelY < centerY ? "bottom" : "top";
    ctx.fillText(flavorMetrics[i].label, labelX, labelY);
  }

  const polygonPoints = flavorMetrics.map((metric, index) => {
    const value = clampFlavorValue(profile[metric.key]);
    const ratio = value / 10;
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / points;
    return {
      x: centerX + Math.cos(angle) * maxRadius * ratio,
      y: centerY + Math.sin(angle) * maxRadius * ratio
    };
  });

  ctx.beginPath();
  polygonPoints.forEach((point, index) => {
    if (index === 0) {
      ctx.moveTo(point.x, point.y);
    } else {
      ctx.lineTo(point.x, point.y);
    }
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(74, 127, 107, 0.22)";
  ctx.strokeStyle = "rgba(62, 108, 92, 0.78)";
  ctx.lineWidth = 2.2;
  ctx.fill();
  ctx.stroke();
}

function clampFlavorValue(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return 0;
  }
  return Math.max(0, Math.min(10, parsed));
}

function resolveFlavorProfileForRecipe(recipe) {
  const source = recipe.flavorProfile || {};
  const hasAnyMetric = flavorMetrics.some(metric => Number.isFinite(Number(source[metric.key])));

  if (hasAnyMetric) {
    return {
      acidity: clampFlavorValue(source.acidity),
      body: clampFlavorValue(source.body),
      sweetness: clampFlavorValue(source.sweetness),
      bitterness: clampFlavorValue(source.bitterness),
      aroma: clampFlavorValue(source.aroma)
    };
  }

  const extraction = recipe.extractionEstimate || {};
  const ey = Number(extraction.eyPercent);
  const tds = Number(extraction.tdsPercent);

  const fallback = {
    acidity: 5,
    body: 5,
    sweetness: 5,
    bitterness: 4.5,
    aroma: 5
  };

  if (Number.isFinite(ey)) {
    if (ey < 18) {
      const under = 18 - ey;
      fallback.acidity -= under * 0.45;
      fallback.sweetness -= under * 0.35;
      fallback.aroma -= under * 0.3;
      fallback.body -= under * 0.25;
      fallback.bitterness -= under * 0.18;
    } else if (ey > 22) {
      const over = ey - 22;
      fallback.bitterness += over * 0.55;
      fallback.sweetness -= over * 0.42;
      fallback.aroma -= over * 0.32;
      fallback.acidity -= over * 0.22;
      fallback.body += over * 0.16;
    }
  }

  if (Number.isFinite(tds)) {
    if (tds < 1.1) {
      const thin = 1.1 - tds;
      fallback.body -= thin * 2.4;
      fallback.sweetness -= thin * 1.2;
      fallback.bitterness -= thin * 0.8;
    } else if (tds > 1.8) {
      const dense = tds - 1.8;
      fallback.body += dense * 2.8;
      fallback.bitterness += dense * 1.8;
      fallback.sweetness += dense * 0.6;
    }
  }

  return {
    acidity: clampFlavorValue(fallback.acidity),
    body: clampFlavorValue(fallback.body),
    sweetness: clampFlavorValue(fallback.sweetness),
    bitterness: clampFlavorValue(fallback.bitterness),
    aroma: clampFlavorValue(fallback.aroma)
  };
}

function redrawAllRecipeRadars() {
  if (!recipeListEl) {
    return;
  }

  recipeListEl.querySelectorAll(".dashboard-radar-canvas").forEach(canvas => {
    const recipeId = canvas.dataset.recipeId;
    const recipe = recipes.find(item => item.id === recipeId);
    if (recipe) {
      drawRecipeRadar(canvas, resolveFlavorProfileForRecipe(recipe));
    }
  });
}

function queueRadarRedraw() {
  if (radarRedrawTimer) {
    clearTimeout(radarRedrawTimer);
  }

  radarRedrawTimer = setTimeout(() => {
    redrawAllRecipeRadars();
    radarRedrawTimer = null;
  }, 90);
}

function renderRecipeCards() {
  if (!recipeListEl) {
    return;
  }

  recipeListEl.innerHTML = "";
  updateDashboardStats();

  if (recipes.length === 0) {
    setDashboardMessage("Belum ada resep tersimpan. Klik Tambah Resep untuk membuat resep baru.", "warning");
    recipeListEl.innerHTML = `
      <article class="dashboard-empty-state">
        <h3>Belum Ada Resep</h3>
        <p>Mulai dari Brew Builder untuk membuat dan menyimpan resep pertama kamu.</p>
      </article>
    `;
    return;
  }

  setDashboardMessage(`Total ${recipes.length} resep pada akun ini.`, "success");

  recipes.forEach((recipe, index) => {
    const card = document.createElement("article");
    card.className = "dashboard-recipe-card";
    card.style.setProperty("--card-index", String(index));

    const head = document.createElement("div");
    head.className = "dashboard-recipe-head";

    const title = document.createElement("h3");
    title.textContent = recipe.title || "Resep tanpa judul";

    const dateBadge = document.createElement("span");
    dateBadge.className = "tag";
    dateBadge.textContent = formatTimestamp(recipe.updatedAt || recipe.createdAt);

    head.append(title, dateBadge);

    const badges = document.createElement("div");
    badges.className = "dashboard-recipe-badges";

    const coffeeBadge = document.createElement("span");
    coffeeBadge.className = "dashboard-recipe-badge coffee";
    coffeeBadge.textContent = recipe.coffeeLabel || recipe.coffeeType || "Kopi";

    const toolBadge = document.createElement("span");
    toolBadge.className = "dashboard-recipe-badge tool";
    toolBadge.textContent = recipe.brewToolLabel || recipe.brewTool || "Brew Tool";

    badges.append(coffeeBadge, toolBadge);

    const note = document.createElement("p");
    note.className = "dashboard-recipe-note";
    note.textContent = "Profil rasa ringkas";

    const noteList = document.createElement("ul");
    noteList.className = "dashboard-recipe-narrative";
    const narrativeLines = splitNarrativeLines(recipe);
    if (narrativeLines.length === 0) {
      const fallbackItem = document.createElement("li");
      fallbackItem.textContent = "Tanpa catatan tambahan.";
      noteList.append(fallbackItem);
    } else {
      narrativeLines.slice(0, 8).forEach(line => {
        const item = document.createElement("li");
        item.textContent = line;
        noteList.append(item);
      });
    }

    const layout = document.createElement("div");
    layout.className = "dashboard-recipe-layout";

    const mainPanel = document.createElement("section");
    mainPanel.className = "dashboard-recipe-main";
    mainPanel.append(note, noteList);

    const steps = Array.isArray(recipe.steps) ? recipe.steps : [];
    const brewSteps = steps.filter(step => String(step.title || "").toLowerCase() !== "catatan rasa");

    const stepTitle = document.createElement("h4");
    stepTitle.className = "dashboard-subtitle";
    stepTitle.textContent = "Step by Step";

    const stepList = document.createElement("ul");
    stepList.className = "dashboard-recipe-steps";

    if (brewSteps.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.textContent = "Langkah belum tersedia.";
      stepList.append(emptyItem);
    } else {
      brewSteps.slice(0, 8).forEach((step, stepIndex) => {
        const item = document.createElement("li");
        const text = step.desc
          ? `${step.title || `Step ${stepIndex + 1}`}: ${step.desc}`
          : String(step.title || `Step ${stepIndex + 1}`);
        item.textContent = text;
        stepList.append(item);
      });
    }
    mainPanel.append(stepTitle, stepList);

    const asidePanel = document.createElement("aside");
    asidePanel.className = "dashboard-recipe-aside";

    const profileTitle = document.createElement("h4");
    profileTitle.className = "dashboard-subtitle";
    profileTitle.textContent = "Brew Profile";

    const profileList = document.createElement("div");
    profileList.className = "dashboard-profile-list";
    getBrewProfileRows(recipe).forEach(row => {
      const stat = document.createElement("div");
      stat.className = "dashboard-profile-row";

      const label = document.createElement("span");
      label.textContent = row.label;

      const value = document.createElement("span");
      value.className = "dashboard-profile-tag";
      value.textContent = row.value || "-";

      stat.append(label, value);
      profileList.append(stat);
    });

    const radarTitle = document.createElement("h4");
    radarTitle.className = "dashboard-subtitle";
    radarTitle.textContent = "Radar Chart";

    const radarCard = document.createElement("div");
    radarCard.className = "dashboard-radar-card";
    const radarCanvas = buildRadarCanvas(recipe.id);
    radarCard.append(radarCanvas);

    asidePanel.append(profileTitle, profileList, radarTitle, radarCard);
    layout.append(mainPanel, asidePanel);

    const actions = document.createElement("div");
    actions.className = "dashboard-recipe-actions";

    const brewBtn = document.createElement("a");
    brewBtn.className = "dashboard-action-btn";
    brewBtn.href = "index.html";
    brewBtn.textContent = "Buka Builder";

    const editBtn = document.createElement("button");
    editBtn.className = "dashboard-action-btn";
    editBtn.dataset.action = "edit";
    editBtn.dataset.id = recipe.id;
    editBtn.type = "button";
    editBtn.textContent = "Edit Resep";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "dashboard-action-btn";
    deleteBtn.dataset.action = "delete";
    deleteBtn.dataset.id = recipe.id;
    deleteBtn.type = "button";
    deleteBtn.textContent = "Hapus Resep";

    actions.append(brewBtn, editBtn, deleteBtn);
    card.append(head, badges, layout, actions);
    recipeListEl.append(card);

    drawRecipeRadar(radarCanvas, resolveFlavorProfileForRecipe(recipe));
  });

  queueRadarRedraw();
}

async function handleRecipeAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const recipeId = button.dataset.id;
  const action = button.dataset.action;
  if (!recipeId || !action) {
    return;
  }

  const recipe = recipes.find(item => item.id === recipeId);
  if (!recipe) {
    return;
  }

  if (action === "edit") {
    try {
      sessionStorage.setItem("brew:editRecipe", JSON.stringify(recipe));
    } catch {
      // Ignore session storage failure and continue navigation.
    }
    window.location.href = "index.html?mode=edit";
    return;
  }

  if (action !== "delete") {
    return;
  }

  if (!currentUser || !db) {
    setDashboardMessage("Koneksi akun belum siap.", "error");
    return;
  }

  const shouldDelete = window.confirm(`Hapus resep \"${recipe.title || "Tanpa Judul"}\"?`);
  if (!shouldDelete) {
    return;
  }

  try {
    await deleteDoc(doc(db, "users", currentUser.uid, "recipes", recipeId));
    setDashboardMessage("Resep berhasil dihapus.", "success");
  } catch (error) {
    setDashboardMessage(error.message || "Gagal menghapus resep.", "error");
  }
}

function subscribeRecipes(uid) {
  if (!db) {
    setDashboardMessage("Firestore belum siap.", "error");
    return;
  }

  if (recipeUnsubscribe) {
    recipeUnsubscribe();
    recipeUnsubscribe = null;
  }

  const recipesQuery = query(collection(db, "users", uid, "recipes"), orderBy("updatedAt", "desc"));

  recipeUnsubscribe = onSnapshot(
    recipesQuery,
    snapshot => {
      recipes = snapshot.docs.map(docItem => ({ id: docItem.id, ...docItem.data() }));
      renderRecipeCards();
    },
    error => {
      setDashboardMessage(error.message || "Gagal memuat list resep.", "error");
    }
  );
}

function bootstrapDashboard() {
  if (recipeListEl) {
    recipeListEl.addEventListener("click", handleRecipeAction);
  }

  window.addEventListener("resize", queueRadarRedraw);

  if (!firebaseReady || !auth) {
    setDashboardMessage("Firebase belum dikonfigurasi. Isi firebase-config.js lalu refresh halaman.", "warning");
    updateDashboardStats();
    return;
  }

  onAuthStateChanged(auth, user => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    currentUser = user;
    subscribeRecipes(user.uid);
  });

  updateDashboardStats();
}

bootstrapDashboard();
