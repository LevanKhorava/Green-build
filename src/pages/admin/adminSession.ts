/**
 * sessionStorage, not localStorage: the unlock lasts only as long as the tab.
 * Close it (or open /admin in a new tab) and the password is asked again.
 */
const STORAGE_KEY = "greenbuild.adminUnlocked";

export function readUnlocked(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function rememberUnlocked() {
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // Blocked storage — the session simply isn't remembered.
  }
}

export function forgetUnlocked() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // Nothing to clean up.
  }
}
