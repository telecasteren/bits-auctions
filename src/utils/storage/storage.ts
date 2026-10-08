export const saveKey = (key: string, value: unknown): void => {
  if (value === undefined) {
    localStorage.removeItem(key);
    return;
  }
  localStorage.setItem(key, JSON.stringify(value));
};

export const loadKey = (key: string): unknown => {
  const rawKey = localStorage.getItem(key);
  if (rawKey === null) return null;

  try {
    return JSON.parse(rawKey);
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

export const logoutFromStorage = () => {
  localStorage.clear();
  window.location.href = "/";
};

export const removeKey = (key: string) => {
  localStorage.removeItem(key);
};
