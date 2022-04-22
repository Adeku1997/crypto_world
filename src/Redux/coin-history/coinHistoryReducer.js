const INITIAL_STATE = {
  coinHistory: [],
  loading: true,
  error:''
};

const coinHistoryReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_COIN_HISTORY":
      return {
        ...state,
        coinHistory: action.payload,
      };
    case "FETCH_COIN_HISTORY_SUCCESS":
      return {
        ...state,
        coinHistory: action.payload,
        loading: false,
      };
    case "FETCH_COIN_HISTORY_FAILED":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default coinHistoryReducer;
