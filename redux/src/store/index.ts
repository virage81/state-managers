import { combineReducers, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactsReducer } from './reducers';

const rootReducer = combineReducers({
	contacts: contactsReducer,
});
const persistedReducer = persistReducer({ key: 'redux-storage', storage: storage }, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
