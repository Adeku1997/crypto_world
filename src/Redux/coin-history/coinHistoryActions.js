import axios from "axios";

const FetchCoinHistory = (coinId, timePeriod) => async (dispatch) => {
  dispatch({
    type: "FETCH_COIN_HISTORY",
  });
  try {
    const { data } = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}/history/?timePeriod=${timePeriod}`,
      {
        headers: {
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          "X-RapidAPI-Key":
            process.env.REACT_APP_RAPID_API_KEY
        },
      }
    );
    dispatch({
      type: "FETCH_COIN_HISTORY_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log("response", "error");
    dispatch({
      type: "FETCH_COIN_HISTORY_FAILED",
      payload: error,
    });
  }
};
export const fetchCoinHistory = (coinId, timePeriod) => (dispatch) => {
  dispatch(FetchCoinHistory(coinId,timePeriod));
};
