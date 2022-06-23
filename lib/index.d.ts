/**
 * Create selected fields from graphql info
 *
 * @param {Object} queryInfo query info
 * @param {Object} options options
 * @param {[String]} [options.additionalFields=[]] additional fields to get
 * @param {String} [options.path=''] child path of query
 * @param {String} [options.returnType='string'] must be either: string, array, or object. Default: string
 * @returns
 */
export function createSelectedFields(queryInfo: any, options?: {
    additionalFields?: [string];
    path?: string;
    returnType?: string;
}): any;
/**
 * Create merged selected fields. Useful for dataloader batch function
 *
 * @param {[String]} batchingKeys dataloader batching keys. Each element must be a JSON string
 * @param {Object} options options
 * @param {[String]} [options.additionalFields=[]] additional fields to get
 * @param {String} [options.returnType='string'] must be either: string, array, or object. Default: string
 * @returns
 */
export function createMergedSelectedFields(batchingKeys: [string], options?: {
    additionalFields?: [string];
    returnType?: string;
}): {
    ids: any;
    selectedFields: any;
};
