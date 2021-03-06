import { combineReducers, Action, createStore, applyMiddleware } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import facilities from './facilities/reducers';
import ui from './ui/reducers';

const rootReducer = combineReducers({
  facilities,
  ui,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
