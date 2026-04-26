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
    note.textContent = recipe.notes || recipe.flavorNarrative || "Tanpa catatan tambahan.";

    const steps = Array.isArray(recipe.steps) ? recipe.steps : [];
    const stepList = document.createElement("ul");
    stepList.className = "dashboard-recipe-steps";

    if (steps.length === 0) {
      const emptyItem = document.createElement("li");
      emptyItem.textContent = "Langkah belum tersedia.";
      stepList.append(emptyItem);
    } else {
      steps.slice(0, 4).forEach((step, stepIndex) => {
        const item = document.createElement("li");
        item.textContent = String(step.desc || step.title || `Step ${stepIndex + 1}`);
        stepList.append(item);
      });
    }

    const actions = document.createElement("div");
    actions.className = "dashboard-recipe-actions";

    const brewBtn = document.createElement("a");
    brewBtn.className = "dashboard-action-btn";
    brewBtn.href = "index.html";
    brewBtn.textContent = "Buka Builder";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "dashboard-action-btn";
    deleteBtn.dataset.action = "delete";
    deleteBtn.dataset.id = recipe.id;
    deleteBtn.type = "button";
    deleteBtn.textContent = "Hapus Resep";

    actions.append(brewBtn, deleteBtn);
    card.append(head, badges, note, stepList, actions);
    recipeListEl.append(card);
  });
}

async function handleRecipeAction(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const recipeId = button.dataset.id;
  if (!recipeId || button.dataset.action !== "delete") {
    return;
  }

  const recipe = recipes.find(item => item.id === recipeId);
  if (!recipe) {
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
