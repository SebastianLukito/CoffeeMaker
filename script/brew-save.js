import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { addDoc, collection, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db, firebaseReady } from "./firebase-client.js";

const saveBtnEl = document.getElementById("saveRecipeBtn");
const saveStatusEl = document.getElementById("saveStatus");

let latestRecipeSnapshot = null;
let currentUser = null;

function setSaveStatus(message, tone = "info") {
  if (!saveStatusEl) {
    return;
  }

  saveStatusEl.textContent = message;
  saveStatusEl.dataset.tone = tone;
}

function getSelectedLabel(elementId) {
  const element = document.getElementById(elementId);
  if (!element || !(element instanceof HTMLSelectElement)) {
    return "";
  }

  const selected = element.options[element.selectedIndex];
  return selected ? selected.textContent.trim() : "";
}

function getToolFieldSnapshot() {
  const fields = {};
  const toolFieldsEl = document.getElementById("toolFields");

  if (!toolFieldsEl) {
    return fields;
  }

  const controls = toolFieldsEl.querySelectorAll("input, select, textarea");
  controls.forEach(control => {
    if (!control.id) {
      return;
    }

    fields[control.id] = control.value;
  });

  return fields;
}

function getStepsFromRecipeDom() {
  const recipeEl = document.getElementById("recipe");
  if (!recipeEl) {
    return [];
  }

  const stepEls = recipeEl.querySelectorAll(".step");
  return Array.from(stepEls).map((stepEl, index) => {
    const titleEl = stepEl.querySelector("h4");
    const descEl = stepEl.querySelector("p");

    return {
      title: titleEl ? titleEl.textContent.trim() : `Step ${index + 1}`,
      desc: descEl ? descEl.textContent.trim() : "",
      durationSec: null
    };
  });
}

function buildFallbackSnapshot() {
  const coffeeTypeEl = document.getElementById("coffeeType");
  const brewToolEl = document.getElementById("brewTool");

  if (!coffeeTypeEl || !brewToolEl) {
    return null;
  }

  const steps = getStepsFromRecipeDom();

  return {
    title: `${getSelectedLabel("coffeeType")} - ${getSelectedLabel("brewTool")}`,
    coffeeType: coffeeTypeEl.value || "",
    coffeeLabel: getSelectedLabel("coffeeType"),
    brewTool: brewToolEl.value || "",
    brewToolLabel: getSelectedLabel("brewTool"),
    settings: {
      ...getToolFieldSnapshot(),
      customCoffee: document.getElementById("customCoffee")?.value?.trim() || ""
    },
    steps,
    flavorNarrative: steps.length > 0 ? steps[steps.length - 1].desc : "",
    sourcePage: "index"
  };
}

function normalizeRecipeSnapshot(snapshot) {
  if (!snapshot) {
    return null;
  }

  const steps = Array.isArray(snapshot.steps)
    ? snapshot.steps
        .map((step, index) => ({
          title: String(step.title || `Step ${index + 1}`).trim(),
          desc: String(step.desc || "").trim(),
          durationSec: Number.isFinite(Number(step.durationSec)) ? Number(step.durationSec) : null
        }))
        .filter(step => step.title || step.desc)
    : [];

  if (steps.length === 0) {
    return null;
  }

  return {
    title: String(snapshot.title || `${snapshot.coffeeLabel || "Coffee"} - ${snapshot.brewToolLabel || "Brew"}`).trim(),
    coffeeType: String(snapshot.coffeeType || ""),
    coffeeLabel: String(snapshot.coffeeLabel || ""),
    brewTool: String(snapshot.brewTool || ""),
    brewToolLabel: String(snapshot.brewToolLabel || ""),
    settings: typeof snapshot.settings === "object" && snapshot.settings !== null ? snapshot.settings : {},
    steps,
    flavorNarrative: String(snapshot.flavorNarrative || ""),
    sourcePage: String(snapshot.sourcePage || "index")
  };
}

function updateSaveButtonState() {
  if (!saveBtnEl) {
    return;
  }

  if (!firebaseReady) {
    saveBtnEl.disabled = true;
    setSaveStatus("Firebase belum aktif. Isi firebase-config.js dulu.", "warning");
    return;
  }

  if (!currentUser) {
    saveBtnEl.disabled = false;
    setSaveStatus("Login dulu supaya resep bisa disimpan ke akun kamu.", "warning");
    return;
  }

  const snapshot = normalizeRecipeSnapshot(latestRecipeSnapshot) || normalizeRecipeSnapshot(buildFallbackSnapshot());
  if (!snapshot) {
    saveBtnEl.disabled = true;
    setSaveStatus("Buat langkah seduh dulu, lalu simpan ke dashboard.", "info");
    return;
  }

  saveBtnEl.disabled = false;
  setSaveStatus("Resep siap disimpan ke dashboard akun.", "success");
}

async function saveCurrentRecipe() {
  if (!firebaseReady) {
    setSaveStatus("Firebase belum aktif. Lihat FIREBASE_SETUP.md.", "error");
    return;
  }

  if (!currentUser) {
    setSaveStatus("Kamu belum login. Silakan login dulu.", "warning");
    if (window.__brewAuth && typeof window.__brewAuth.openModal === "function") {
      window.__brewAuth.openModal();
    }
    return;
  }

  const snapshot = normalizeRecipeSnapshot(latestRecipeSnapshot) || normalizeRecipeSnapshot(buildFallbackSnapshot());
  if (!snapshot) {
    setSaveStatus("Belum ada resep yang bisa disimpan.", "warning");
    return;
  }

  saveBtnEl.disabled = true;
  setSaveStatus("Menyimpan resep ke dashboard...", "info");

  try {
    await addDoc(collection(db, "users", currentUser.uid, "recipes"), {
      ...snapshot,
      notes: "",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    setSaveStatus("Resep berhasil disimpan ke dashboard.", "success");
  } catch (error) {
    setSaveStatus(error.message || "Gagal menyimpan resep.", "error");
  } finally {
    updateSaveButtonState();
  }
}

function bootstrapSaveRecipe() {
  if (!saveBtnEl) {
    return;
  }

  window.addEventListener("brew:recipe-ready", event => {
    latestRecipeSnapshot = event.detail || null;
    updateSaveButtonState();
  });

  if (window.__brewLatestRecipe) {
    latestRecipeSnapshot = window.__brewLatestRecipe;
  }

  saveBtnEl.addEventListener("click", saveCurrentRecipe);

  if (firebaseReady && auth) {
    onAuthStateChanged(auth, user => {
      currentUser = user;
      updateSaveButtonState();
    });
  } else {
    updateSaveButtonState();
  }
}

bootstrapSaveRecipe();
