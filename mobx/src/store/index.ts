import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import contactsReducer, { contactsApiMiddleware, contactsApiReducer, contactsApiReducerPath } from './contacts';

const persistedReducers = persistReducer(
	{ key: 'redux-storage', storage: storage },
	combineReducers({ contacts: contactsReducer, [contactsApiReducerPath]: contactsApiReducer })
);

export const store = configureStore({
	reducer: persistedReducers,
	devTools: true,
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
			},
		}).concat([contactsApiMiddleware]);
	},
});

const persistor = persistStore(store);
// @ts-ignore
window.persistor = persistor;

type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
