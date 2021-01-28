import axios from "axios";
import * as types from "../constants/ActionTypes";

export const getTransactionListApi = async (userId) => {
  const header = await createToken();
  try {
    const res = await axios.post(
      "http://localhost:4000/api/transactions",
      userId,
      header
    );
    dispatch({ type: types.GET_TRANSACTIONS, payload: res.data });
  } catch (err) {
    dispatch({ type: types.TRANSACTION_ERROR, payload: err.response });
  }
};
