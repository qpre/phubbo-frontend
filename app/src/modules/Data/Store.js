import {publish, subscribe} from '../../modules/Notifier/notifier';

let store     = {};
let observers = {};

export function set (key, data) {
  let pValue = store[key];

  store[key] = data;

  if (pValue !== undefined) {
    publish(`store:update:${key}`);
  }
}

export function remove (key) {
  delete store[key];

  publish(`store:remove:${key}`);
}

export function get (key) {
  return store[key];
}
