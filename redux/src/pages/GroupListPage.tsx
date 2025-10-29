import { memo } from 'react';
import { Col, Row } from 'react-bootstrap';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { CommonPageProps } from './types';

export const GroupListPage = memo<CommonPageProps>(({ contactsState, groupContactsState }) => {
	return (
		<Row xxl={4}>
			{groupContactsState[0].map(groupContacts => (
				<Col key={groupContacts.id}>
					<GroupContactsCard groupContacts={groupContacts} withLink />
				</Col>
			))}
		</Row>
	);
});
