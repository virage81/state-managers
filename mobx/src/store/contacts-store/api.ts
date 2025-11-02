import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

class Api {
	protected baseUri = 'https://mocki.io/v1';

	protected makeRequest(uri: string, config?: RequestInit) {
		return fetch(`${this.baseUri}${uri}`, config);
	}

	public async getContacts(): Promise<ContactDto[]> {
		const res = await this.makeRequest('/450ae938-9ba2-42c3-a873-fd2e36277100');
		if (res.ok) return await res.json();
		throw new Error('Something wrong');
	}
	public async getGroupContacts(): Promise<GroupContactsDto[]> {
		const res = await this.makeRequest('/b6f477e4-dcef-47fe-8245-809f991d82ef');
		if (res.ok) return await res.json();
		throw new Error('Something wrong');
	}
}

export const contactsApi = new Api();
