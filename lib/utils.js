/**
 * Remove Path Collision from input fields
 *
 * @param {[string]} fields input fields
 * @returns fields projection
 */
function removePathCollision(fields) {
  let fieldsCollision = fields;
  fields.forEach(field => {
    fieldsCollision = fieldsCollision.filter(f => !f.startsWith(`${field}.`));
  });

  const formatData = {};
  fieldsCollision.forEach(field => { formatData[field] = 1; });

  return formatData;
}

module.exports = {
  removePathCollision,
};
