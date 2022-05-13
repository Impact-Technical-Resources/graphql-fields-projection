const _ = require('lodash');

/**
 * Remove Path Collision from input fields
 *
 * @param {[string]} fields input fields
 * @returns fields projection
 */

/**
* author
* @TrongPham
* @KhoaNgo
* */

function removePathCollision(fields) {
  const sortFields = fields.sort();
  let previousKey = sortFields[0];
  const results = [];

  sortFields.forEach(field => {
    if (!field.startsWith(`${previousKey}.`)) {
      results.push(field);
      previousKey = field;
    }
  });

  return _.reduce(results, (result, item) => ({ ...result, [item]: 1 }), {});
}

module.exports = {
  removePathCollision,
};
