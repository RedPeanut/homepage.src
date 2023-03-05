import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
//import * as reducers from '../reducers'
import { tools, others } from '../reducers'
import { browserHistory } from 'react-router'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/rootSaga';

export default function configureStore(preloadedState) {

  const reducer = combineReducers({
    //...reducers,
    tools, others,
    routing: routerReducer
  });

  const sagaMiddleWare = createSagaMiddleware();
  const routerMiddleWare = routerMiddleware(browserHistory);

  let store = createStore(reducer, preloadedState, compose(applyMiddleware(sagaMiddleWare, routerMiddleWare)));
  sagaMiddleWare.run(rootSaga);

  return store
}