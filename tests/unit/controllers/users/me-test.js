import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('controller:users/me', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
  needs: ['controller:session']
});

// Replace this with your real tests.
test('it exists', function (assert) {
  let controller = this.subject();
  assert.ok(controller);
});
