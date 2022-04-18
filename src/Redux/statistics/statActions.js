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
          "X-RapidAPI-Key":
            "62d08bd2ddmsh5bfb8d4d2b25300p151d32jsna5a89e927061",
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