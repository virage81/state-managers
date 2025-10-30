import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { FilterContactValues } from '.';

interface ContactsState {
	contacts: ContactDto[];
	filteredContacts: ContactDto[];
	groupContacts: GroupContactsDto[];
	filteredGroupContacts: GroupContactsDto | null;
	favoriteContacts: ContactDto[];
}

const initialState: ContactsState = {
	contacts: DATA_CONTACT,
	filteredContacts: DATA_CONTACT,
	groupContacts: DATA_GROUP_CONTACT,
	filteredGroupContacts: null,
	favoriteContacts: [],
};

export const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		filterContacts: (state, action: PayloadAction<Partial<FilterContactValues>>) => {
			const { contacts } = state;

			if (!Object.keys(action.payload).length) {
				state.filteredContacts = contacts;
			}

			if (action.payload.name) {
				const fvName = action.payload.name.toLowerCase().trim();
				state.filteredContacts = contacts.filter(({ name }) => name.toLowerCase().trim().indexOf(fvName) > -1);
			}

			if (action.payload.groupId) {
				const groupContacts = state.groupContacts.find(({ id }) => id === action.payload.groupId);

				if (groupContacts) {
					state.filteredContacts = contacts.filter(({ id }) => groupContacts.contactIds.includes(id));
				}
			}
		},

		filterGroupContacts: (state, action: PayloadAction<{ id: GroupContactsDto['id'] }>) => {
			const { groupContacts } = state;

			state.filteredGroupContacts = groupContacts.find(({ id }) => id === action.payload.id) ?? null;
		},

		filterFavoriteContacts: state => {
			const { contacts } = state;

			const favoriteContactsIds = [DATA_CONTACT[0].id, DATA_CONTACT[1].id, DATA_CONTACT[2].id, DATA_CONTACT[3].id];

			state.favoriteContacts = contacts.filter(({ id }) => favoriteContactsIds.includes(id));
		},
	},
});
