import * as types from "../constants/ActionTypes";
import { getTransactionListApi } from "../services/transaction-service";
// export const addTransaction = () => ({ type: types.ADD_TRANSACTION, text });
export const getTransactions = (userId) => ({
  type: types.GET_TRANSACTIONS,
  userId: userId,
});
export const clearTransactions = (id) => ({
  type: types.CLEAR_TRANSACTIONS,
  id,
});
