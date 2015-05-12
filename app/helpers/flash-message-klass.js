import Ember from 'ember';

export function flashMessageKlass(type) {
  let klass;

  switch (type) {
    case 'success':
      klass = 'success';
      break;
    case 'error':
      klass = 'danger';
      break;
    case 'warning':
      klass = 'warning';
      break;
    case 'info':
      klass = 'info';
      break;
    default:
      klass = 'info';
  }

  return new Ember.Handlebars.SafeString(klass);
}

export default Ember.Handlebars.makeBoundHelper(flashMessageKlass);
