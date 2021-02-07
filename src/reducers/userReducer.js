const initialState = {
  userId: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_USER_DETAILS":
      return {
        ...state,
        userId: action.payload,
      };

    default:
      return state;
  }
}
