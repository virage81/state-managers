import { memo, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { ContactDto } from 'src/types/dto/ContactDto';
import { GroupContactsDto } from 'src/types/dto/GroupContactsDto';
import { CommonPageProps } from './types';

export const GroupPage = memo<CommonPageProps>(({ contactsState, groupContactsState }) => {
	const { groupId } = useParams<{ groupId: string }>();
	const [contacts, setContacts] = useState<ContactDto[]>([]);
	const [groupContacts, setGroupContacts] = useState<GroupContactsDto>();

	useEffect(() => {
		const findGroup = groupContactsState[0].find(({ id }) => id === groupId);
		setGroupContacts(findGroup);
		setContacts(() => {
			if (findGroup) {
				return contactsState[0].filter(({ id }) => findGroup.contactIds.includes(id));
			}
			return [];
		});
	}, [groupId]);

	return (
		<Row className='g-4'>
			{groupContacts ? (
				<>
					<Col xxl={12}>
						<Row xxl={3}>
							<Col className='mx-auto'>
								<GroupContactsCard groupContacts={groupContacts} />
							</Col>
						</Row>
					</Col>
					<Col>
						<Row xxl={4} className='g-4'>
							{contacts.map(contact => (
								<Col key={contact.id}>
									<ContactCard contact={contact} withLink />
								</Col>
							))}
						</Row>
					</Col>
				</>
			) : (
				<Empty />
			)}
		</Row>
	);
});
