import {
  authUrl
} from '../../../helpers/auth-url';
import { module, test } from 'qunit';

module('AuthUrlHelper');

// Replace this with your real tests.
test('it works', function (assert) {
  let result = authUrl(42);
  assert.ok(result);
});
