import React, { useReducer } from "react";
import axios from "axios";
import TransactionContext from "./transactionContext";
import transactionReducer from "./transactionReducer";
import firebaseAuth from "../firebase/firebaseConfig";
import {
  ADD_TRANSACTION,
  DELETE_TRANSACTION,
  SET_CURRENT,
  CLEAR_CURRENT,
  FILTER_TRANSACTIONS,
  UPDATE_CURRENT,
  CLEAR_FILTER,
  GET_TRANSACTIONS,
  CLEAR_TRANSACTIONS,
  TRANSACTION_ERROR,
} from "./types";

const TransactionState = (props) => {
  const initialState = {
    transactions: [],
    current: null,
    filtered: null,
  };

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
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  //Get transactions
  const getTransactions = async (userId) => {
    console.log({ userId });
    const header = await createToken();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/transactions",
        userId,
        header
      );
      dispatch({ type: GET_TRANSACTIONS, payload: res.data });
    } catch (err) {
      dispatch({ type: TRANSACTION_ERROR, payload: err.response });
    }
  };

  // Add Contact

  const addTransaction = async (transaction) => {
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
      dispatch({ type: ADD_TRANSACTION, payload: res.data });
    } catch (err) {
      dispatch({ type: TRANSACTION_ERROR, payload: err });
    }
  };
  // Delete Contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`api/transactions/addTransactionDetails/${id}`);
      dispatch({ type: DELETE_TRANSACTION, payload: id });
    } catch (err) {
      dispatch({ type: TRANSACTION_ERROR, payload: err.response.msg });
    }
  };

  // Set current transaction
  function setCurrent(transaction) {
    dispatch({ type: SET_CURRENT, payload: transaction });
  }
  // Clear current transaction
  function clearCurrent() {
    dispatch({ type: CLEAR_CURRENT });
  }
  // Update Contact
  const updateContact = async (transaction) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.put(
        `api/transactions/${transaction._id}`,
        transaction,
        config
      );
      dispatch({ type: UPDATE_CURRENT, payload: res.data });
    } catch (err) {
      dispatch({ type: TRANSACTION_ERROR, payload: err.response.msg });
    }
  };
  // Filter Contacts
  function filterContacts(text) {
    dispatch({ type: FILTER_TRANSACTIONS, payload: text });
  }

  // Clear Filter
  function clearFilter() {
    dispatch({ type: CLEAR_FILTER });
  }

  function clearContacts() {
    dispatch({ type: CLEAR_TRANSACTIONS });
  }

  return (
    <TransactionContext.Provider
      value={{
        transactions: state.transactions,
        current: state.current,
        filtered: state.filtered,
        addTransaction,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        clearFilter,
        filterContacts,
        getTransactions,
        clearContacts,
      }}
    >
      {props.children}
    </TransactionContext.Provider>
  );
};

export default TransactionState;
