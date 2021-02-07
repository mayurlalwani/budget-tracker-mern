const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let TransactionSchema = new Schema({
  userId: {
    type: String,
  },
  transactionType: {
    type: String,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
  },
  amount: {
    type: Number,
  },
  mode: {
    type: String,
  },
});
module.exports = mongoose.model("transaction", TransactionSchema);
