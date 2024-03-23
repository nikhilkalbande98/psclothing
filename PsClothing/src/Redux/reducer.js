// reducers.js
const initialState = {
  cartData: {},
  error: null,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CART_DATA_SUCCESS":
      return { ...state, cartData: action.payload, error: null };
    case "FETCH_CART_DATA_ERROR":
      return { ...state, cartData: {}, error: action.error };
    default:
      return state;
  }
};

export default cartReducer;
