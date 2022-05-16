/**
 * Remove Path Collision from input fields
 *
 * @param {[string]} fields input fields
 * @returns fields projection
 */
function removePathCollision(fields) {
  const sortedFields = fields.sort((a, b) => a.length > b.length);

  for (let i = 0; i <= sortedFields.length / 2; i += 1) {
    const field0 = `${sortedFields[i]}.`;
    let j = i + 1;
    while (j < sortedFields.length) {
      const field1 = sortedFields[j];
      if (field1.startsWith(field0)) {
        sortedFields.splice(j, 1);
      } else {
        j += 1;
      }
    }
  }

  const projection = {};
  sortedFields.forEach(x => {
    projection[x] = 1;
  });

  return projection;
}

module.exports = {
  removePathCollision,
};
