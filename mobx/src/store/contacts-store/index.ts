import { computed, flow, makeAutoObservable } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { contactsApi } from './api';
import { FilterContactValues } from './types';

export * from './types';

class Store {
	public contacts: ContactDto[] = [];
	public filteredContacts: ContactDto[] = [];
	public groupContacts: GroupContactsDto[] = [];
	public filteredGroupContacts: GroupContactsDto | null = null;

	constructor() {
		makeAutoObservable(this, {
			favoriteContacts: computed,
		});

		makePersistable(this, {
			name: 'contacts-store',
			properties: ['contacts', 'groupContacts', 'filteredGroupContacts'],
			storage: window.localStorage,
		});
	}

	public get favoriteContacts() {
		return this.contacts.slice(0, 4);
	}

	public filterContacts(filters: Partial<FilterContactValues> = {}) {
		let filteredContacts = [...this.contacts];

		if (filters.name) {
			const fvName = filters.name.toLowerCase().trim();
			if (fvName)
				filteredContacts = filteredContacts.filter(({ name }) => name.toLowerCase().trim().indexOf(fvName) > -1);
		}

		if (filters.groupId) {
			const groupContacts = this.groupContacts.find(({ id }) => id === filters.groupId);
			if (groupContacts) filteredContacts = filteredContacts.filter(({ id }) => groupContacts.contactIds.includes(id));
		}

		this.filteredContacts = filteredContacts;
	}

	public filterGroupContacts(filters: { id: GroupContactsDto['id'] }) {
		this.filteredGroupContacts = this.groupContacts.find(({ id }) => id === filters.id) ?? null;
	}

	public getContacts: () => Promise<void> = flow(function* (
		this: Store
	): Generator<Promise<ContactDto[]>, void, ContactDto[]> {
		try {
			const data = yield contactsApi.getContacts();
			this.contacts = data;
			this.filteredContacts = data;
		} catch (error) {
			console.error('[contactsStore.getContacts]', error);
			this.contacts = this.contacts.length ? this.contacts : [];
			this.filteredContacts = this.contacts.length ? this.filteredContacts : [];
		}
	});

	public getGroupContacts: () => Promise<void> = flow(function* (
		this: Store
	): Generator<Promise<GroupContactsDto[]>, void, GroupContactsDto[]> {
		try {
			const data = yield contactsApi.getGroupContacts();
			this.groupContacts = data;
		} catch (error) {
			console.error('[contactsStore.getGroupContacts]', error);
			this.groupContacts = this.groupContacts.length ? this.groupContacts : [];
		}
	});
}

export const contactsStore = new Store();
