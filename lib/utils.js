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
**/

function removePathCollision(fields) {
   let previousKey;
   const results = [];
   const sortFields = _.sortBy(fields);
  
   sortFields.forEach(field => {
    if (!previousKey || !field.startsWith(`${previousKey}.`)) {
      results.push(field);
      previousKey = field;
    }
  });

  return _.reduce(results, (result, item) => ({ ...result, [item]: 1 }), {});
}

module.exports = {
  removePathCollision,
};
