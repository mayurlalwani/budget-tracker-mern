import axios from "axios";
import * as types from "../constants/ActionTypes";
import firebaseAuth from "../firebase/firebaseConfig";

const createToken = async () => {
  const user = firebaseAuth.auth().currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

export const getTransactionListApi = async (userId) => {
  const header = await createToken();
  try {
    const res = await axios.post(
      "http://localhost:4000/api/transactions",
      userId,
      header
    );
    return res;
  } catch (err) {}
};

export const addTransactionApi = async (transaction) => {
  const header = await createToken();
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "http://localhost:4000/api/transactions/addTransactionDetails",
      transaction,
      // config,
      header
    );
    return res;
  } catch (err) {}
};
