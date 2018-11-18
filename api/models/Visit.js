/**
 * Visit.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    id: { type: 'string', columnName: '_id' },
    userId: { type: "string", required: true },
    name: { type: "string", required: true },
    visitId: { type: "string", required: true, unique: true },
    //or just use _id as an visitId , but I don't want to expose this information
    updatedAt: false
  }
};
