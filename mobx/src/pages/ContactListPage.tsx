import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { contactsStore } from 'src/store/contacts-store';
import { FilterContactValues } from 'src/store/contacts-store/';

export const ContactListPage = observer(() => {
	const { filteredContacts, groupContacts } = contactsStore;

	const onSubmit = (fv: Partial<FilterContactValues>) => {
		contactsStore.filterContacts(fv);
	};

	useEffect(() => {
		return () => {
			contactsStore.filterContacts({});
		};
	}, []);

	return (
		<Row xxl={1}>
			<Col className='mb-3'>
				<FilterForm groupContactsList={groupContacts} initialValues={{}} onSubmit={onSubmit} />
			</Col>
			<Col>
				<Row xxl={4} className='g-4'>
					{filteredContacts.map(contact => (
						<Col key={contact.id}>
							<ContactCard contact={contact} withLink />
						</Col>
					))}
				</Row>
			</Col>
		</Row>
	);
});
