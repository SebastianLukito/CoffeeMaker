import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db, firebaseReady } from "./firebase-client.js";

const welcomeHeadingEl = document.getElementById("welcomeHeading");
const homeIntroEl = document.getElementById("homeIntro");
const recipeCountEl = document.getElementById("recipeCount");
const lastUpdatedEl = document.getElementById("lastUpdated");
const recentCountEl = document.getElementById("recentCount");
const homeStatusEl = document.getElementById("homeStatus");
const recentRecipeListEl = document.getElementById("recentRecipeList");

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

  const meta = document.createElement("p");
  meta.className = "recent-recipe-meta";
  meta.textContent = `${recipe.coffeeLabel || recipe.coffeeType || "Kopi"} · ${recipe.brewToolLabel || recipe.brewTool || "Brew Tool"}`;

  const note = document.createElement("p");
  note.className = "recent-recipe-note";
  note.textContent = recipe.flavorNarrative || recipe.notes || "Belum ada catatan tambahan.";

  card.append(head, meta, note);
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

    const latestRecipes = latestSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    recipeCountEl.textContent = String(allSnapshot.size);
    recentCountEl.textContent = String(latestRecipes.length);
    lastUpdatedEl.textContent = latestRecipes.length > 0
      ? formatTimestamp(latestRecipes[0].updatedAt || latestRecipes[0].createdAt)
      : "-";

    recentRecipeListEl.innerHTML = "";

    if (latestRecipes.length === 0) {
      updateStatus("Belum ada resep tersimpan. Coba racik di halaman Brew Builder lalu klik simpan.", "warning");
      return;
    }

    latestRecipes.forEach(recipe => {
      recentRecipeListEl.append(createRecipeCard(recipe));
    });

    updateStatus("Resep terbaru berhasil dimuat.", "success");
  } catch (error) {
    updateStatus(error.message || "Gagal memuat resep.", "error");
  }
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

  onAuthStateChanged(auth, async user => {
    if (!user) {
      window.location.href = "index.html";
      return;
    }

    if (welcomeHeadingEl) {
      welcomeHeadingEl.textContent = `Selamat datang, ${user.email}.`;
    }
    if (homeIntroEl) {
      homeIntroEl.textContent = "Di sini kamu bisa lihat ringkasan resep personal sebelum masuk ke dashboard penuh.";
    }

    await loadAccountRecipes(user.uid);
  });
}

bootstrapHomePage();
