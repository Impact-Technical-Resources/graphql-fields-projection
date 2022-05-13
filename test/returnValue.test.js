const assert = require('assert');
const { createResult } = require('../lib/utils');

describe('Testing createResult function', () => {
  it('Return array', () => {
    const input = ['id', 'owner', 'address', 'info.firstName', 'info.lastName'];
    const expected = ['id', 'owner', 'address', 'info.firstName', 'info.lastName'];

    const output = createResult(input, 'array');
    assert.deepEqual(output, expected);
  });

  it('Return string', () => {
    const input = ['id', 'owner', 'address', 'info.firstName', 'info.lastName'];
    const expected = 'id owner address info.firstName info.lastName';

    const output = createResult(input, 'string');
    assert.deepEqual(output, expected);
  });

  it('Return object', () => {
    const input = ['id', 'owner', 'address', 'info.firstName', 'info.lastName'];
    const expected = {
      id: 1,
      owner: 1,
      address: 1,
      'info.firstName': 1,
      'info.lastName': 1,
    };

    const output = createResult(input, 'object');
    assert.deepEqual(output, expected);
  });
});
