/**
 * Safe local storage utility with graceful fallback for mobile browsers,
 * private browsing modes, and cross-origin iframes with partitioned/blocked storage.
 */
export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      if (typeof window === 'undefined') return null;
      return window.localStorage.getItem(key);
    } catch (e) {
      console.warn(`[Storage] Failed to read key "${key}":`, e);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.setItem(key, value);
    } catch (e) {
      console.warn(`[Storage] Failed to write key "${key}":`, e);
    }
  },

  removeItem: (key: string): void => {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.removeItem(key);
    } catch (e) {
      console.warn(`[Storage] Failed to remove key "${key}":`, e);
    }
  },

  clear: (): void => {
    try {
      if (typeof window === 'undefined') return;
      window.localStorage.clear();
    } catch (e) {
      console.warn('[Storage] Failed to clear storage:', e);
    }
  },
};
