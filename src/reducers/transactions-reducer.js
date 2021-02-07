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
} from "../constants/ActionTypes";

const initialState = {
  transactions: [],
  current: null,
  filtered: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
        loading: false,
      };

    case ADD_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload],
        loading: false,
      };
    case UPDATE_CURRENT:
      return {
        ...state,
        transactions: state.transactions.map((transaction) =>
          transaction._id === action.payload._id ? action.payload : transaction
        ),
        loading: false,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        transactions: state.transactions.filter(
          (transaction) => transaction._id !== action.payload
        ),
      };
    case CLEAR_TRANSACTIONS:
      return {
        ...state,
        transactions: null,
        filtered: null,
        error: null,
        current: null,
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null,
      };
    case FILTER_TRANSACTIONS:
      return {
        ...state,
        filtered: state.transactions.filter((transaction) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            transaction.name.match(regex) || transaction.email.match(regex)
          );
        }),
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null,
      };
    default:
      return state;
  }
}
