const mongoose = require('../config/connection');

const Schema = mongoose.Schema;

let ClientSchema = new Schema(
  {
    name: {
      type: String
    },
    documentation: {
      type: String
    },
    gender: {
      type: String
    },
    birthday: {
      type: String
    }
  },
  { collection: "Clients" }
);

const Model = mongoose.model
const ClientModel = Model("Clients", ClientSchema)

module.exports = ClientModel