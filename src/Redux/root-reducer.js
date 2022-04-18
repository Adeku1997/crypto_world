import { combineReducers } from "redux";
import statReducer from "./statistics/statReducer";
import newsReducer from "./news/newsReducer";
import cryptoReducer from "./crypto-details/cryptoReducer";
import coinHistoryReducer from "./coin-history/coinHistoryReducer";
import exchangesReducer from "./exchanges/exchangesReducer";

const rootReducer = combineReducers({
  stat: statReducer,
  news: newsReducer,
  crypto: cryptoReducer,
  history: coinHistoryReducer,
  exchanges: exchangesReducer,
});

export default rootReducer;
