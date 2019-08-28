import { createStore } from 'redux';
import reducer from './reducer';
import { initialState } from '../helpers/consts';

const store = createStore(
  reducer,
  initialState,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

export default store;
