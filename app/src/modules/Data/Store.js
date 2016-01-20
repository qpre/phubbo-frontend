import {publish, subscribe} from '../../modules/Notifier/notifier';
import * as Storage         from './localStorage';
import * as Obj             from '../../lib/polyfills/object';

let store     = {};
let observers = {};

export function restore() {
  let data = Storage.get('phubo_data');

  if (data) {
    store = JSON.parse(data);
  }
};

export function set(key, data) {
  let pValue = store[key];

  store[key] = data;

  if (pValue !== undefined) {
    publish(`store:update:${key}`, store[key]);
  }

  Storage.set('phubo_data', JSON.stringify(store));
};

export function update(key, hash) {
  let pValue = store[key];

  store[key] = Obj.assign(pValue || {}, key);
  publish(`store:update:${key}`, store[key]);

  Storage.set('phubo_data', JSON.stringify(store));
}

export function remove(key) {
  delete store[key];

  publish(`store:remove:${key}`);
}

export function get(key) {
  return store[key];
}

window.debugData = () => {
  let data = Storage.get('phubo_data');

  if (data) {
    return JSON.parse(data);
  }
};
