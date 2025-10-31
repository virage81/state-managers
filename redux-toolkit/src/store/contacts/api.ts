import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';

export const contactsApiSlice = createApi({
	reducerPath: 'contactsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://mocki.io/v1' }),
	endpoints: builder => ({
		getContacts: builder.query<ContactDto[], void>({
			query: () => '/450ae938-9ba2-42c3-a873-fd2e36277100',
		}),
		getGroupContacts: builder.query<GroupContactsDto[], void>({
			query: () => '/b6f477e4-dcef-47fe-8245-809f991d82ef',
		}),
	}),
});
