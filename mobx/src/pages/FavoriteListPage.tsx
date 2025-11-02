import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import { ContactCard } from 'src/components/ContactCard';
import { contactsStore } from 'src/store/contacts-store';

export const FavoriteListPage = observer(() => {
	return (
		<Row xxl={4} className='g-4'>
			{contactsStore.favoriteContacts.map(contact => (
				<Col key={contact.id}>
					<ContactCard contact={contact} withLink />
				</Col>
			))}
		</Row>
	);
});
