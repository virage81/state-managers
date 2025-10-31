import { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { useAppDispatch, useAppSelector } from 'src/store';
import { filterFavoriteContacts } from 'src/store/contacts';

export const FavoriteListPage = memo(() => {
	const dispatch = useAppDispatch();

	const { favoriteContacts } = useAppSelector(state => state.contacts);

	useEffect(() => {
		dispatch(filterFavoriteContacts());
	}, []);

	return (
		<Row xxl={4} className='g-4'>
			{favoriteContacts.map(contact => (
				<Col key={contact.id}>
					<ContactCard contact={contact} withLink />
				</Col>
			))}
		</Row>
	);
});
