export const firebaseConfig = {
  apiKey: "AIzaSyChm1PX53GZoLBcczFq1LuHvA5tzv3vtlU",
  authDomain: "coffeeproject-f4676.firebaseapp.com",
  projectId: "coffeeproject-f4676",
  storageBucket: "coffeeproject-f4676.firebasestorage.app",
  messagingSenderId: "371586750371",
  appId: "1:371586750371:web:9fbb89b2d64693c9e26c16"
};

const placeholderPrefixes = ["ISI_", "YOUR_"];

export function isFirebaseConfigReady() {
  const requiredKeys = [
    "apiKey",
    "authDomain",
    "projectId",
    "storageBucket",
    "messagingSenderId",
    "appId"
  ];

  return requiredKeys.every(key => {
    const value = String(firebaseConfig[key] || "").trim();
    if (!value) {
      return false;
    }

    return !placeholderPrefixes.some(prefix => value.startsWith(prefix));
  });
}
