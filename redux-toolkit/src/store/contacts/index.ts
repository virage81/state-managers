import { contactsApiSlice } from './api';
import { contactsSlice } from './slice';

export * from './types';

const reducer = contactsSlice.reducer;

export const { filterContacts, filterGroupContacts, filterFavoriteContacts } = contactsSlice.actions;
export const { useGetContactsQuery, useGetGroupContactsQuery } = contactsApiSlice;
export const { getContacts, getGroupContacts } = contactsApiSlice.endpoints;

export const contactsApiReducerPath = contactsApiSlice.reducerPath;
export const contactsApiReducer = contactsApiSlice.reducer;
export const contactsApiMiddleware = contactsApiSlice.middleware;

export default reducer;
