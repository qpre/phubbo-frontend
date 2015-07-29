import {publish, subscribe} from '../../modules/Notifier/notifier';
import * as Obj from '../../lib/polyfills/object';

let store     = {};
let observers = {};

export function set (key, data) {
  let pValue = store[key];

  store[key] = data;

  if (pValue !== undefined) {
    publish(`store:update:${key}`, store[key]);
  }
}

export function update (key, hash) {
  let pValue = store[key];

  store[key] = Obj.assign(pValue || {}, key);
  publish(`store:update:${key}`, store[key]);
}

export function remove (key) {
  delete store[key];

  publish(`store:remove:${key}`);
}

export function get (key) {
  return store[key];
}
