import { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { filterFavoriteContactsActionCreator } from 'src/store/actions';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

export const FavoriteListPage = memo(() => {
	const dispatch = useAppDispatch();

	const { favoriteContacts } = useAppSelector(state => state.contacts);

	useEffect(() => {
		dispatch(filterFavoriteContactsActionCreator());
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
