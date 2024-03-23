// actions.js
export const fetchCartData = () => {
  return async (dispatch) => {
    try {
      const data = await fetch("/cart-data");
      dispatch({ type: "FETCH_CART_DATA_SUCCESS", payload: data });
    } catch (error) {
      dispatch({ type: "FETCH_CART_DATA_ERROR", error });
    }
  };
};
