import { DATA_CONTACT, DATA_GROUP_CONTACT } from 'src/__data__';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import {
	FILTER_CONTACTS_ACTION,
	FILTER_FAVORITE_CONTACTS_ACTION,
	FILTER_GROUP_CONTACTS_ACTION,
	ProjectActions,
} from '../actions';

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

export const contactsReducer = (state = initialState, action: ProjectActions) => {
	switch (action.type) {
		case FILTER_CONTACTS_ACTION: {
			let findContacts = [...state.contacts];

			if (action.payload.name) {
				const fvName = action.payload.name.toLowerCase().trim();
				findContacts = findContacts.filter(({ name }) => name.toLowerCase().trim().indexOf(fvName) > -1);
			}

			if (action.payload.groupId) {
				const groupContacts = state.groupContacts.find(({ id }) => id === action.payload.groupId);

				if (groupContacts) {
					findContacts = findContacts.filter(({ id }) => groupContacts.contactIds.includes(id));
				}
			}

			return {
				...state,
				filteredContacts: findContacts,
			};
		}

		case FILTER_GROUP_CONTACTS_ACTION: {
			const { groupContacts } = state;

			const filteredGroupContacts = groupContacts.find(({ id }) => id === action.payload.id) ?? null;
			return { ...state, filteredGroupContacts };
		}

		case FILTER_FAVORITE_CONTACTS_ACTION: {
			const { contacts } = state;

			const favoriteContactsIds = [DATA_CONTACT[0].id, DATA_CONTACT[1].id, DATA_CONTACT[2].id, DATA_CONTACT[3].id];

			const favoriteContacts = contacts.filter(({ id }) => favoriteContactsIds.includes(id));
			return { ...state, favoriteContacts };
		}

		default:
			return state;
	}
};
