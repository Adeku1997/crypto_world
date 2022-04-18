const INITIAL_STATE = {
  crypto: [],
  loading: true,
  error: "",
};

const cryptoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_CRYPTO":
      return {
        ...state,
        crypto: action.payload,
      };
    case "FETCH_CRYPTO_SUCCESS":
      return {
        ...state,
        crypto: action.payload,
        loading: false,
      };
    case "FETCH_CRYPTO_FAILED":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
export default cryptoReducer;
