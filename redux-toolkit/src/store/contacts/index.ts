import { contactsSlice } from './slice';

export * from './types';

const reducer = contactsSlice.reducer;

export const { filterContacts, filterGroupContacts, filterFavoriteContacts } = contactsSlice.actions;

export default reducer;
