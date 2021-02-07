const setUserDetails = (data) => {
  return {
    type: "GET_USER_DETAILS",
    payload: data,
  };
};

export const getUserDetailsAction = (data) => {
  console.log({ data });
  return async (dispatch) => {
    try {
      dispatch(setUserDetails(data));
    } catch (error) {}
  };
};
