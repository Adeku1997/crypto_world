const INITIAL_STATE = {
  news: [],
  loading: true,
  error: "",
};

const newsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_NEWS":
      return {
        ...state,
        news: action.payload,
      };
    case "FETCH_NEWS_SUCCESS":
      return {
        ...state,
        news: action.payload,
        loading: false,
      };
    case "FETCH_NEWS_FAILED":
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default newsReducer;
