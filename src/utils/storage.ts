// Local storage helpers for persistence

export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item) as T;
    }
  } catch (e) {
    console.warn(`Error reading localStorage key "${key}":`, e);
  }
  return defaultValue;
}

export function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Error writing to localStorage key "${key}":`, e);
  }
}

export function clearStoredKeys(keys: string[]): void {
  keys.forEach((key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn(`Error removing key "${key}":`, e);
    }
  });
}
