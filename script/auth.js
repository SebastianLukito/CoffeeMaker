import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, doc, getDocs, limit, query, serverTimestamp, setDoc, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db, firebaseReady } from "./firebase-client.js";

const authTriggerEl = document.getElementById("authTrigger");
const authModalEl = document.getElementById("authModal");
const closeAuthModalEl = document.getElementById("closeAuthModal");
const authMessageEl = document.getElementById("authMessage");
const headerActionsEl = document.querySelector(".header-actions");
const logoutBtnEl = document.getElementById("logoutBtn");
const homeLinkEl = document.getElementById("homeLink");
const dashboardLinkEl = document.getElementById("dashboardLink");
const authUserPillEl = document.getElementById("authUserPill");

const showLoginViewBtn = document.getElementById("showLoginView");
const showRegisterViewBtn = document.getElementById("showRegisterView");
const switchToRegisterInlineBtn = document.getElementById("switchToRegisterInline");
const switchToLoginInlineBtn = document.getElementById("switchToLoginInline");

const loginViewEl = document.getElementById("loginView");
const registerViewEl = document.getElementById("registerView");
const authModalSubtitleEl = document.getElementById("authModalSubtitle");

const authLoginEmailEl = document.getElementById("authLoginEmail");
const authLoginPasswordEl = document.getElementById("authLoginPassword");
const authRegisterUsernameEl = document.getElementById("authRegisterUsername");
const authRegisterEmailEl = document.getElementById("authRegisterEmail");
const authRegisterPasswordEl = document.getElementById("authRegisterPassword");

let isRegisteringAccount = false;

function closeMobileHeaderMenu() {
  if (!headerActionsEl) {
    return;
  }

  headerActionsEl.classList.remove("is-mobile-open");

  const toggle = document.getElementById("mobileHeaderToggle");
  if (toggle) {
    toggle.setAttribute("aria-expanded", "false");
  }
}

function setupMobileHeaderMenu() {
  if (!headerActionsEl) {
    return;
  }

  headerActionsEl.classList.add("has-mobile-menu");

  let toggle = document.getElementById("mobileHeaderToggle");
  if (!toggle) {
    toggle = document.createElement("button");
    toggle.id = "mobileHeaderToggle";
    toggle.type = "button";
    toggle.className = "pill pill-link auth-btn mobile-header-toggle";
    toggle.setAttribute("aria-label", "Buka menu navigasi");
    toggle.setAttribute("aria-expanded", "false");
    toggle.innerHTML = '<span class="mobile-header-toggle-bar" aria-hidden="true"></span>';
    headerActionsEl.insertBefore(toggle, headerActionsEl.firstChild);
  }

  toggle.addEventListener("click", () => {
    const next = !headerActionsEl.classList.contains("is-mobile-open");
    headerActionsEl.classList.toggle("is-mobile-open", next);
    toggle.setAttribute("aria-expanded", String(next));
  });

  headerActionsEl.addEventListener("click", event => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    if (target.closest("#mobileHeaderToggle")) {
      return;
    }

    if (target.closest("a, button")) {
      closeMobileHeaderMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileHeaderMenu();
    }
  });
}

function isStaticAuthPill() {
  return Boolean(authUserPillEl && authUserPillEl.dataset.staticLabel);
}

function showAuthUserPill(user) {
  if (!authUserPillEl || isStaticAuthPill()) {
    return;
  }

  authUserPillEl.hidden = false;
  authUserPillEl.textContent = user && user.email ? `Akun: ${user.email}` : "Akun aktif";
}

function hideAuthUserPill() {
  if (!authUserPillEl || isStaticAuthPill()) {
    return;
  }

  authUserPillEl.hidden = true;
  authUserPillEl.textContent = "";
}

function setAuthMessage(message, tone = "info") {
  if (!authMessageEl) {
    return;
  }

  authMessageEl.textContent = message;
  authMessageEl.dataset.tone = tone;
}

function mapAuthErrorMessage(error, fallbackMessage) {
  if (!error || typeof error !== "object") {
    return fallbackMessage;
  }

  if (error.code === "permission-denied") {
    return "Login username butuh izin baca data profil user di Firestore. Update Firestore Rules atau pakai backend resolver username.";
  }

  return error.message || fallbackMessage;
}

function setAuthMode(mode) {
  const isLoginMode = mode === "login";

  if (loginViewEl) {
    loginViewEl.classList.toggle("is-hidden", !isLoginMode);
  }

  if (registerViewEl) {
    registerViewEl.classList.toggle("is-hidden", isLoginMode);
  }

  if (showLoginViewBtn) {
    showLoginViewBtn.classList.toggle("is-active", isLoginMode);
    showLoginViewBtn.setAttribute("aria-pressed", String(isLoginMode));
  }

  if (showRegisterViewBtn) {
    showRegisterViewBtn.classList.toggle("is-active", !isLoginMode);
    showRegisterViewBtn.setAttribute("aria-pressed", String(!isLoginMode));
  }

  if (authModalSubtitleEl) {
    authModalSubtitleEl.textContent = isLoginMode
      ? "Masuk dengan username atau email untuk mengakses home dan dashboard resep personal."
      : "Buat akun untuk menyimpan resep personal kamu.";
  }
}

function focusFirstField(mode) {
  if (mode === "register") {
    authRegisterUsernameEl?.focus();
    return;
  }

  authLoginEmailEl?.focus();
}

function openAuthModal(mode = "login") {
  if (!authModalEl) {
    return;
  }

  authModalEl.hidden = false;
  document.body.classList.add("modal-open");
  setAuthMode(mode);
  focusFirstField(mode);
}

function closeAuthModal() {
  if (!authModalEl) {
    return;
  }

  authModalEl.hidden = true;
  document.body.classList.remove("modal-open");
}

function resetAuthFields() {
  if (authLoginPasswordEl) {
    authLoginPasswordEl.value = "";
  }
  if (authRegisterUsernameEl) {
    authRegisterUsernameEl.value = "";
  }
  if (authRegisterEmailEl) {
    authRegisterEmailEl.value = "";
  }
  if (authRegisterPasswordEl) {
    authRegisterPasswordEl.value = "";
  }
}

function applyLoggedOutUI() {
  if (authTriggerEl) {
    authTriggerEl.hidden = false;
    authTriggerEl.textContent = "Login";
  }
  if (logoutBtnEl) {
    logoutBtnEl.hidden = true;
  }
  if (homeLinkEl) {
    homeLinkEl.hidden = true;
  }
  if (dashboardLinkEl) {
    dashboardLinkEl.hidden = true;
  }

  hideAuthUserPill();
}

function applyLoggedInUI(user) {
  if (authTriggerEl) {
    authTriggerEl.hidden = true;
  }
  if (logoutBtnEl) {
    logoutBtnEl.hidden = false;
  }
  if (homeLinkEl) {
    homeLinkEl.hidden = false;
  }
  if (dashboardLinkEl) {
    dashboardLinkEl.hidden = false;
  }

  showAuthUserPill(user);
}

async function saveUserProfile(user, username) {
  if (!db || !user) {
    return;
  }

  await setDoc(
    doc(db, "users", user.uid),
    {
      username,
      usernameLower: username.toLowerCase(),
      email: user.email || "",
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp()
    },
    { merge: true }
  );
}

async function resolveLoginEmail(identifier) {
  const value = identifier.trim();

  if (!value) {
    return "";
  }

  if (value.includes("@")) {
    return value;
  }

  if (!db) {
    return "";
  }

  const usernameLower = value.toLowerCase();
  const lowerQuery = query(collection(db, "users"), where("usernameLower", "==", usernameLower), limit(1));
  const lowerSnapshot = await getDocs(lowerQuery);

  if (!lowerSnapshot.empty) {
    const match = lowerSnapshot.docs[0].data();
    if (match.email) {
      return match.email;
    }
  }

  const exactQuery = query(collection(db, "users"), where("username", "==", value), limit(1));
  const exactSnapshot = await getDocs(exactQuery);

  if (!exactSnapshot.empty) {
    const match = exactSnapshot.docs[0].data();
    if (match.email) {
      return match.email;
    }
  }

  return "";
}

async function loginWithEmail(event) {
  event.preventDefault();

  if (!auth || !authLoginEmailEl || !authLoginPasswordEl) {
    return;
  }

  const loginIdentifier = authLoginEmailEl.value.trim();
  const password = authLoginPasswordEl.value.trim();

  if (!loginIdentifier || !password) {
    setAuthMessage("Username/email dan password wajib diisi.", "error");
    return;
  }

  const submitButton = event.submitter || document.getElementById("loginSubmit");
  const registerButton = document.getElementById("registerSubmit");
  if (submitButton) {
    submitButton.disabled = true;
  }
  if (registerButton) {
    registerButton.disabled = true;
  }

  try {
    const email = await resolveLoginEmail(loginIdentifier);

    if (!email) {
      setAuthMessage("Username atau email tidak ditemukan.", "error");
      return;
    }

    await signInWithEmailAndPassword(auth, email, password);
    setAuthMessage("Login berhasil.", "success");
    resetAuthFields();
    closeAuthModal();
  } catch (error) {
    setAuthMessage(mapAuthErrorMessage(error, "Login gagal."), "error");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
    }
    if (registerButton) {
      registerButton.disabled = false;
    }
  }
}

async function registerWithEmail(event) {
  event.preventDefault();

  if (!auth || !authRegisterUsernameEl || !authRegisterEmailEl || !authRegisterPasswordEl) {
    return;
  }

  const username = authRegisterUsernameEl.value.trim();
  const email = authRegisterEmailEl.value.trim();
  const password = authRegisterPasswordEl.value.trim();

  if (!username || !email || !password) {
    setAuthMessage("Username, email, dan password wajib diisi.", "error");
    return;
  }

  if (password.length < 6) {
    setAuthMessage("Password minimal 6 karakter.", "error");
    return;
  }

  const submitButton = event.submitter || document.getElementById("registerSubmit");
  const loginButton = document.getElementById("loginSubmit");
  if (submitButton) {
    submitButton.disabled = true;
  }
  if (loginButton) {
    loginButton.disabled = true;
  }

  try {
    isRegisteringAccount = true;
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName: username });
    await saveUserProfile(credential.user, username);
    await signOut(auth);

    resetAuthFields();
    applyLoggedOutUI();
    setAuthMode("login");
    openAuthModal("login");
    if (authLoginEmailEl) {
      authLoginEmailEl.value = username;
    }
    if (authLoginPasswordEl) {
      authLoginPasswordEl.value = "";
    }
    setAuthMessage("Registrasi berhasil. Silakan login dengan akun baru kamu.", "success");
    focusFirstField("login");
  } catch (error) {
    setAuthMessage(mapAuthErrorMessage(error, "Registrasi gagal."), "error");
  } finally {
    isRegisteringAccount = false;
    if (submitButton) {
      submitButton.disabled = false;
    }
    if (loginButton) {
      loginButton.disabled = false;
    }
  }
}

async function logoutCurrentUser() {
  if (!auth) {
    return;
  }

  try {
    await signOut(auth);
    setAuthMessage("Kamu sudah logout.", "success");
  } catch (error) {
    setAuthMessage(mapAuthErrorMessage(error, "Logout gagal."), "error");
  }
}

function bootstrapAuthUI() {
  setupMobileHeaderMenu();

  if (authTriggerEl) {
    authTriggerEl.addEventListener("click", () => openAuthModal("login"));
  }

  if (closeAuthModalEl) {
    closeAuthModalEl.addEventListener("click", closeAuthModal);
  }

  if (authModalEl) {
    authModalEl.addEventListener("click", event => {
      if (event.target === authModalEl) {
        closeAuthModal();
      }
    });

    authModalEl.addEventListener("keydown", event => {
      if (event.key !== "Enter" || event.shiftKey || authModalEl.hidden) {
        return;
      }

      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.tagName === "TEXTAREA") {
        return;
      }

      const activeForm = loginViewEl && !loginViewEl.classList.contains("is-hidden") ? loginViewEl : registerViewEl;
      if (!activeForm) {
        return;
      }

      event.preventDefault();

      const submitButton = activeForm.querySelector('button[type="submit"]');
      if (submitButton) {
        activeForm.requestSubmit(submitButton);
      } else {
        activeForm.requestSubmit();
      }
    });
  }

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && authModalEl && !authModalEl.hidden) {
      closeAuthModal();
    }
  });

  if (loginViewEl) {
    loginViewEl.addEventListener("submit", loginWithEmail);
  }

  if (registerViewEl) {
    registerViewEl.addEventListener("submit", registerWithEmail);
  }

  showLoginViewBtn?.addEventListener("click", () => setAuthMode("login"));
  showRegisterViewBtn?.addEventListener("click", () => setAuthMode("register"));
  switchToLoginInlineBtn?.addEventListener("click", () => setAuthMode("login"));
  switchToRegisterInlineBtn?.addEventListener("click", () => setAuthMode("register"));

  if (logoutBtnEl) {
    logoutBtnEl.addEventListener("click", logoutCurrentUser);
  }

  if (!firebaseReady) {
    applyLoggedOutUI();
    if (authTriggerEl) {
      authTriggerEl.hidden = false;
      authTriggerEl.textContent = "Setup Firebase";
      authTriggerEl.addEventListener("click", () => {
        openAuthModal("login");
        setAuthMessage("Isi file firebase-config.js dulu. Lihat FIREBASE_SETUP.md untuk langkah lengkap.", "warning");
      });
    }

    if (loginViewEl) {
      loginViewEl.querySelectorAll("button, input").forEach(el => (el.disabled = true));
    }
    if (registerViewEl) {
      registerViewEl.querySelectorAll("button, input").forEach(el => (el.disabled = true));
    }

    hideAuthUserPill();
    setAuthMessage("Firebase belum aktif. Isi firebase-config.js dulu.", "warning");
    return;
  }

  onAuthStateChanged(auth, user => {
    if (isRegisteringAccount) {
      window.dispatchEvent(new CustomEvent("auth:state", { detail: { user } }));
      return;
    }

    if (user) {
      applyLoggedInUI(user);
      closeAuthModal();
      setAuthMessage("Akun aktif.", "success");
    } else {
      applyLoggedOutUI();
      setAuthMode("login");
    }

    window.dispatchEvent(new CustomEvent("auth:state", { detail: { user } }));
  });
}

window.__brewAuth = {
  openModal: openAuthModal,
  closeModal: closeAuthModal,
  getCurrentUser: () => (auth ? auth.currentUser : null),
  firebaseReady
};

bootstrapAuthUI();
