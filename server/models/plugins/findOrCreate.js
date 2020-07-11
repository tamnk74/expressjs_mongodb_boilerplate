/* eslint-disable no-param-reassign */

const findOrCreate = (schema) => {
  /**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} isCreated - is created or not
   * @property {number} instance - instance
   */
  /**
   * Query for documents with pagination
   * @param {Object} [filter] - filter conditions for findOne
   * @param {Object} [data] - data for new instance in case of not found
   */
  schema.statics.findOrCreate = async function (filter, data) {

    const instance = await this.findOne(filter);
    if (instance) {
      return [false, instance];
    }
    console.log(data);
    const newInstance = await this.create(data);
    return [true, newInstance]
  };
};

module.exports = findOrCreate;