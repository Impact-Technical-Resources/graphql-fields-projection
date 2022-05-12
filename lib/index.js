const _ = require('lodash');
const graphqlFields = require('graphql-fields');

const { removePathCollision } = require('./utils');

/**
 * Create selected fields from graphql info
 *
 * @param {Object} queryInfo query info
 * @param {Object} options options
 * @param {[String]} [options.additionalFields=[]] additional fields to get
 * @param {string} [options.path=''] child path of query
 * @param {string} [options.returnType='array'] must be either: string, array, or object. Default: array
 * @returns
 */
function createSelectedFields(queryInfo, options) {
  const { additionalFields = [], path = '', returnType = 'array' } = options;
  const parsedFields = path ? graphqlFields(queryInfo)[path] : graphqlFields(queryInfo);
  const selectedFields = _.chain(parsedFields)
    .keys()
    .filter(item => !['__typename'].includes(item))
    .value();
  const finalFields = _.union(additionalFields, selectedFields);

  return returnType === 'array'
    ? finalFields : returnType === 'string' ? finalFields.join(' ')
      : _.reduce(finalFields, (result, item) => ({ ...result, [item]: 1 }), {});
}

/**
 * Create merged selected fields. Useful for dataloader batch function
 *
 * @param {[String]} batchingKeys dataloader batching keys. Each element must be a JSON string
 * @param {Object} options options
 * @param {[String]} [options.additionalFields=[]] additional fields to get
 * @param {string} [options.returnType='array'] must be either: string, array, or object. Default: array
 * @returns
 */
function createMergedSelectedFields(batchingKeys, options) {
  const { additionalFields = [], returnType = 'array' } = options;
  let mergeSelectedFields = [];
  const ids = _.map(batchingKeys, key => {
    const { id, selectedFields } = JSON.parse(key);
    mergeSelectedFields = _.union(mergeSelectedFields, selectedFields);
    return id;
  });

  const finalFields = _.union(additionalFields, mergeSelectedFields);

  const selectedFields = returnType === 'array' ? finalFields
    : returnType === 'string' ? finalFields.join(' ')
      : _.reduce(finalFields, (result, item) => ({ ...result, [item]: 1 }), {});
  return { ids, selectedFields };
}

module.exports = {
  createSelectedFields,
  createMergedSelectedFields,
};
