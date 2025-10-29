import { combineReducers, createStore } from 'redux';
import { contactsReducer } from './reducers/contactsReducer';

const reducers = combineReducers({
	contacts: contactsReducer,
});
export const store = createStore(reducers);

export type RootState = ReturnType<typeof reducers>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
