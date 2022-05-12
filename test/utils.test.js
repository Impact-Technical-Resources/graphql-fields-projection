const assert = require('assert');
const { removePathCollision } = require('../lib/utils');

describe('Testing removePathCollision function', () => {
  it('Test case 1', () => {
    const input = ['id', 'user', 'user.info', 'user.info.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      user: 1,
    };

    const output = removePathCollision(input);
    assert.deepEqual(output, expected);
  });

  it('Test case 2', () => {
    const input = ['id', 'user.info', 'user.info.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      'user.info': 1,
    };

    const output = removePathCollision(input);
    assert.deepEqual(output, expected);
  });

  it('Test case 3', () => {
    const input = ['id', 'user.info.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      'user.info.firstName': 1,
      'user.info.lastName': 1,
    };
    const output = removePathCollision(input);
    assert.deepEqual(output, expected);
  });

  it('Test case 4', () => {
    const input = ['id', 'user', 'user.info.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      user: 1,
    };

    const output = removePathCollision(input);
    assert.deepEqual(output, expected);
  });

  it('Test case 5', () => {
    const input = ['id', 'user', 'user.info', 'user.info.lastName'];
    const expected = {
      id: 1,
      user: 1,
    };
    const output = removePathCollision(input);
    assert.deepEqual(output, expected);
  });

  it('Test case 6', () => {
    const input = ['id', 'user.info.secondaryContact.firstName', 'user.info.firstName'];
    const expected = {
      id: 1,
      'user.info.firstName': 1,
      'user.info.secondaryContact.firstName': 1,
    };
    const output = removePathCollision(input);
    assert.deepEqual(output, expected);
  });

  it('Test case 7', () => {
    const input = ['id', 'user', 'user.info', 'user.info.firstName', 'user.info.secondaryContact.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      user: 1,
    };

    const output = removePathCollision(input);
    assert.deepEqual(output, expected);
  });
  it('Test case 8', () => {
    const input = ['id', 'metadata', 'user.info', 'user.info.firstName', 'user.info.secondaryContact.firstName', 'user.info.lastName'];
    const expected = {
      id: 1,
      metadata: 1,
      'user.info': 1,
    };

    const output = removePathCollision(input);
    assert.deepEqual(output, expected);
  });
});
