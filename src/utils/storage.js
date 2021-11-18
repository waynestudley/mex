import axios from "axios";

export function getStorage(item) {
  return localStorage.getItem(item);
}
export function setStorage(item, value) {
  return localStorage.setItem(item, value);
}
export function clearStorage(item) {
  return localStorage.removeItem(item);
}
export function clearAllStorage() {
  return localStorage.clear();
}
export function clearAllStorageKey(prefix) {
  var removeKeys = [];

  for (var i = 0; i < localStorage.length; i++) {
    var keyName = localStorage.key(i);
    if (keyName.startsWith(prefix)) {
      removeKeys.push(keyName);
    }
  }

  for (var n = 0; n < removeKeys.length; n++) {
    localStorage.removeItem(removeKeys[n]);
  }
}
export function setAxiosHeaders() {
  axios.defaults.headers.common["Authorization"] =
    "Bearer " + getStorage("Login.token");
}
