const INITIAL_STATE = {
  exchanges: [],
  loading: true,
  error:''
};

const exchangesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_EXCHANGES":
      return {
        ...state,
        exchanges: action.payload,
      };

    case "FETCH_EXCHANGES_SUCCESS":
      return {
        ...state,
        exchanges: action.payload,
        loading: false,
      };
      case "FETCH_EXCHANGES_FAILURE":
        return{
          ...state,
          error:action.payload
        }
    default:
      return state;
  }
};

export default exchangesReducer;
