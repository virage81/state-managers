import { observer } from 'mobx-react-lite';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { contactsStore } from 'src/store/contacts-store';

export const GroupListPage = observer(() => {
	return (
		<Row xxl={4}>
			{contactsStore.groupContacts.map(groupContact => (
				<Col key={groupContact.id}>
					<GroupContactsCard groupContacts={groupContact} withLink />
				</Col>
			))}
		</Row>
	);
});
