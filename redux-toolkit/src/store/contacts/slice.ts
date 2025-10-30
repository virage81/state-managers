import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { FilterContactValues, getContacts, getGroupContacts } from '.';

interface ContactsState {
	contacts: ContactDto[];
	filteredContacts: ContactDto[];
	groupContacts: GroupContactsDto[];
	filteredGroupContacts: GroupContactsDto | null;
	favoriteContacts: ContactDto[];
}
const initialState: ContactsState = {
	contacts: [],
	filteredContacts: [],
	groupContacts: [],
	filteredGroupContacts: null,
	favoriteContacts: [],
};

export const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		filterContacts: (state, action: PayloadAction<Partial<FilterContactValues>>) => {
			let filteredContacts = [...state.contacts];

			if (action.payload.name) {
				const fvName = action.payload.name.toLowerCase().trim();
				filteredContacts = filteredContacts.filter(({ name }) => name.toLowerCase().trim().indexOf(fvName) > -1);
			}

			if (action.payload.groupId) {
				const groupContacts = state.groupContacts.find(({ id }) => id === action.payload.groupId);

				if (groupContacts) {
					filteredContacts = filteredContacts.filter(({ id }) => groupContacts.contactIds.includes(id));
				}
			}

			state.filteredContacts = filteredContacts;
		},

		filterGroupContacts: (state, action: PayloadAction<{ id: GroupContactsDto['id'] }>) => {
			const { groupContacts } = state;

			state.filteredGroupContacts = groupContacts.find(({ id }) => id === action.payload.id) ?? null;
		},

		filterFavoriteContacts: state => {
			const { contacts } = state;

			state.favoriteContacts = contacts.slice(0, 4);
		},
	},
	extraReducers: builder => {
		builder.addMatcher(getContacts.matchFulfilled, (state, action: PayloadAction<ContactDto[]>) => {
			state.contacts = action.payload;
			state.filteredContacts = action.payload;
		});
		builder.addMatcher(getContacts.matchRejected, state => {
			state.contacts = [];
			state.filteredContacts = [];
		});
		builder.addMatcher(getGroupContacts.matchFulfilled, (state, action: PayloadAction<GroupContactsDto[]>) => {
			state.groupContacts = action.payload;
		});
		builder.addMatcher(getGroupContacts.matchRejected, state => {
			state.groupContacts = [];
		});
	},
});
