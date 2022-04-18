import axios from "axios";


const FetchNews = (newsCategory) => async (dispatch) => {
  dispatch({
    type: "FETCH_NEWS",
  });
  try { 
    const { data } = await axios.get(
      `https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=OFF&textFormat=Raw&freshness=Day`,
      {
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
          "X-RapidAPI-Key":
            "62d08bd2ddmsh5bfb8d4d2b25300p151d32jsna5a89e927061",
        },
      }
    );
    dispatch({
      type: "FETCH_NEWS_SUCCESS",
      payload: data,
    });
  } catch (error) {
    console.log("response", error);
    dispatch({
      type: "FETCH_NEWS_FAILED",
      payload: error,
    });
  }
};
export const fetchNews = (Cryptocurrency) => (dispatch) => {
  dispatch(FetchNews(Cryptocurrency));
};
