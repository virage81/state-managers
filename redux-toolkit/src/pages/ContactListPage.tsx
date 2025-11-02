import { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { FilterForm } from 'src/components/FilterForm';
import { useAppDispatch, useAppSelector } from 'src/store';
import { filterContacts } from 'src/store/contacts';
import { FilterContactValues } from 'src/store/contacts/';

export const ContactListPage = memo(() => {
	const dispatch = useAppDispatch();

	const { filteredContacts, groupContacts } = useAppSelector(state => state.contacts);

	const onSubmit = (fv: Partial<FilterContactValues>) => {
		dispatch(filterContacts(fv));
	};

	useEffect(() => {
		return () => {
			dispatch(filterContacts({}));
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
