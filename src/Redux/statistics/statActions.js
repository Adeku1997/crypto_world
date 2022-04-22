import axios from "axios";

const FetchData = () => async (dispatch) => {
  dispatch({
    type: "FETCH_DATA",
  });
  try {
    const { data } = await axios.get(
      "https://coinranking1.p.rapidapi.com/coins",
      {
        headers: {
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        },
      }
    );
    dispatch({
      type: "FETCH_DATA_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log("response", error);
    dispatch({
      type: "FETCH_DATA_FAILED",
      payload: error,
    });
  }

};
export const fetchData = () => (dispatch) => {
  dispatch(FetchData());
};