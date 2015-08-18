let storage = window.localStorage;

export function set (key, data) {
  return storage.setItem(key, data);
}

export function get (key) {
  return storage.getItem(key);
}
