import axios from "axios";

const FetchExchanges = (coinId) => async (dispatch) => {
  dispatch({
    type: "FETCH_EXCHANGES",
  });
  try {
    const { data } = await axios.get(
      `https://coinranking1.p.rapidapi.com/coin/${coinId}/exchanges?limit=50 `,
      {
        headers: {
          "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
          "X-RapidAPI-Key":
            "62d08bd2ddmsh5bfb8d4d2b25300p151d32jsna5a89e927061",
        },
      }
    );
    dispatch({
      type: FETCH_EXCHANGES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("response", "error");
    dispatch({
      type: "FETCH_EXCHANGES_FAILED",
      payload: error,
    });
  }
};
export const fetchExchanges = (coinId) => (dispatch) => {
  dispatch(FetchExchanges(coinId));
};
