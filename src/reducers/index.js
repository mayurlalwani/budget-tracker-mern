import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage/session";
import Transactions from "./transactions-reducer";

const rootReducer = (state, action) => {
  if (action.type === "USER_LOGOUT") {
    storage.removeItem("persist:root");
  }
  return appReducer(state, action);
};

const appReducer = combineReducers({
  Transactions: Transactions,
});

export default rootReducer;
