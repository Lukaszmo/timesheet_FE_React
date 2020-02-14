import { applyMiddleware, createStore } from 'redux';
import rootReducer from './reducer';
import ReduxThunk from 'redux-thunk';
import logger from 'redux-logger'; //pozwala wyświetlac stan bieżący poprzedni i nastepny w konsoli

export const store = createStore(rootReducer, applyMiddleware(ReduxThunk, logger));