const _ = require('lodash');

/**
 *
 * create the return value
 * @param {[string]} fields input fields
 * @param {string} [returnType='array'] must be either: string, array, or object. Default: array
 * @returns
 */
function createResult(fields, returnType = 'array') {
  return returnType === 'array' ? fields
    : returnType === 'string' ? fields.join(' ')
      : _.reduce(fields, (result, item) => ({ ...result, [item]: 1 }), {});
}

/**
 * Remove Path Collision from input fields
 *
 * @param {[string]} fields input fields
 * @param {string} [returnType='array'] must be either: string, array, or object. Default: array
 * @returns fields projection
 * @author TrongPham KhoaNgo
 */

 function removePathCollision(fields, returnType = 'array') {
  const sortFields = fields.sort();
  const results = [sortFields[0]];
  
  sortFields.forEach(field => {
    if (!results.find(x => field.startsWith(`${x}.`))) {
      results.push(field);
    }
  });

  return createResult(results, returnType);

  // return _.reduce(results, (result, item) => ({ ...result, [item]: 1 }), {});
}

module.exports = {
  removePathCollision,
  createResult,
};
