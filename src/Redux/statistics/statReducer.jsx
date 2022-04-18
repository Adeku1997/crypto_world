const INITIAL_STATE = {
  stats: [],
  loading:true,
  error:''
};

const statReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        stats: action.payload,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        loading: false,
        stats:action.payload
      };
    case "FETCH_DATA_FAILED":
      return {
        ...state,
        stats: action.payload,
      };
    default:
      return state;
  }
};

export default  statReducer;