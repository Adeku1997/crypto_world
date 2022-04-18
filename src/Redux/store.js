import {createStore,applyMiddleware} from 'redux';
import logger from 'redux-logger';
import rootReducer from "./root-reducer";
import thunk from 'redux-thunk';


 const middlewares=[logger,thunk];

// export const store =createStore(rootReducer,applyMiddleware(...middlewares))

// export default store;   

export default function configureStore() {
  let store = createStore(rootReducer, applyMiddleware(...middlewares));
  return store;
}

