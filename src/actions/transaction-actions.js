import * as types from "../constants/ActionTypes";
import {
  getTransactionListApi,
  addTransactionApi,
} from "../services/transaction-service";
// export const addTransaction = () => ({ type: types.ADD_TRANSACTION, text });

// const getTransactionsList = () => {
//   return {
//     type: types.GET_TRANSACTIONS,
//     payload: data,
//   };
// };

const setTransactionsList = (data) => {
  return {
    type: types.ADD_TRANSACTION,
    payload: data,
  };
};

export const getTransactionsAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await getTransactionListApi(data);
      if (response.status === 200) {
        dispatch(setTransactionsList(response.data));
      }
    } catch (error) {}
  };
};

export const addTransactionAction = (data) => {
  return async (dispatch) => {
    try {
      const response = await addTransactionApi(data);
      if (response.status === 200) {
        dispatch(setTransactionsList(response.data));
      }
    } catch (error) {}
  };
};
