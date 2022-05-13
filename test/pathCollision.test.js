const assert = require('assert');
const { removePathCollision } = require('../lib/utils');

describe('Testing removePathCollision function', () => {
  it('Test case 1', () => {
    const input = ['id', 'user', 'user.info', 'user.info.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      user: 1,
    };

    const output = removePathCollision(input, 'object');
    assert.deepEqual(output, expected);
  });

  it('Test case 2', () => {
    const input = ['id', 'user.info', 'user.info.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      'user.info': 1,
    };

    const output = removePathCollision(input, 'object');
    assert.deepEqual(output, expected);
  });

  it('Test case 3', () => {
    const input = ['id', 'user.info.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      'user.info.firstName': 1,
      'user.info.lastName': 1,
    };
    const output = removePathCollision(input, 'object');
    assert.deepEqual(output, expected);
  });

  it('Test case 4', () => {
    const input = ['id', 'user', 'user.info.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      user: 1,
    };

    const output = removePathCollision(input, 'object');
    assert.deepEqual(output, expected);
  });

  it('Test case 5', () => {
    const input = ['id', 'user', 'user.info', 'user.info.lastName'];
    const expected = {
      id: 1,
      user: 1,
    };
    const output = removePathCollision(input, 'object');
    assert.deepEqual(output, expected);
  });

  it('Test case 6', () => {
    const input = ['id', 'user.info.secondaryContact.firstName', 'user.info.firstName'];
    const expected = {
      id: 1,
      'user.info.firstName': 1,
      'user.info.secondaryContact.firstName': 1,
    };
    const output = removePathCollision(input, 'object');
    assert.deepEqual(output, expected);
  });

  it('Test case 7', () => {
    const input = ['id', 'user', 'user.info', 'user.info.firstName', 'user.info.secondaryContact.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      user: 1,
    };

    const output = removePathCollision(input, 'object');
    assert.deepEqual(output, expected);
  });
  it('Test case 8', () => {
    const input = ['id', 'metadata', 'user.info.firstName', 'user.info', 'user.info.secondaryContact.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      metadata: 1,
      'user.info': 1,
    };

    const output = removePathCollision(input, 'object');
    assert.deepEqual(output, expected);
  });

  it('Test case 9', () => {
    const input = ['id', 'metadata', 'company.user.info.firstName', 'user.info.firstName', 'user.info', 'user.info.secondaryContact.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      metadata: 1,
      'user.info': 1,
      'company.user.info.firstName': 1,
    };

    const output = removePathCollision(input, 'object');
    assert.deepEqual(output, expected);
  });

  it('Test case 10', () => {
    const input = [
      'field1-1',
      'field1-2',
      'field1-3',

      'field1-5',
      'field1-6',
      'field1-7',
      'field1-8',
      'field1-9',

      'field1-14',
      'field1-15',

      'field1-3.child1',
      'field1-3.child2',
      'field1-3.child3',

      'field1-3.child1',
      'field1-3.child2',
      'field1-3.child3',
      'field1-3.child4',
      'field1-3.child5',

      'field1-3.child3.child1',
      'field1-3.child3.child2',
      'field1-3.child3.child3',

      'field1-4.child1',
      'field1-4.child2',
      'field1-4.child3',
      'field1-4.child4',
      'field1-4.child5',

      'field1-4.child3.child1',
      'field1-4.child3.child2',
      'field1-4.child3.child3',

      'field1-10.child1.child1',
      'field1-10.child2.child2',
      'field1-10.child2.child2.child1',
      'field1-10.child2.child2.child2',
      'field1-10.child2.child3.child1',

      'field1-11.child1.child3',
      'field1-12.child2.child1',
      'field1-13.child2.child3.child4',
    ];
    const expected = {
      'field1-1': 1,
      'field1-2': 1,
      'field1-3': 1,
      'field1-5': 1,
      'field1-6': 1,
      'field1-7': 1,
      'field1-8': 1,
      'field1-9': 1,
      'field1-14': 1,
      'field1-15': 1,

      'field1-4.child1': 1,
      'field1-4.child2': 1,
      'field1-4.child3': 1,
      'field1-4.child4': 1,
      'field1-4.child5': 1,

      'field1-10.child1.child1': 1,
      'field1-10.child2.child2': 1,
      'field1-10.child2.child3.child1': 1,

      'field1-11.child1.child3': 1,
      'field1-12.child2.child1': 1,
      'field1-13.child2.child3.child4': 1,
    };

    const output = removePathCollision(input, 'object');
    assert.deepEqual(output, expected);
  });
});
