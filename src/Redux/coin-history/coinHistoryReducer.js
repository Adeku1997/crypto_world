const INITIAL_STATE = {
  coinHistory: [],
  loading: true,
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
    default:
      return state;
  }
};

export default coinHistoryReducer;
