import { memo, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { GroupContactsCard } from 'src/components/GroupContactsCard';
import { filterContactsActionCreator, filterGroupContactsActionCreator } from 'src/store/actions';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';

export const GroupPage = memo(() => {
	const dispatch = useAppDispatch();

	const { filteredContacts, filteredGroupContacts } = useAppSelector(state => state.contacts);

	const { groupId } = useParams<{ groupId: string }>();

	useEffect(() => {
		if (!groupId) return;
		dispatch(filterContactsActionCreator({ groupId }));
		dispatch(filterGroupContactsActionCreator(groupId));

		return () => {
			dispatch(filterContactsActionCreator({}));
		};
	}, [groupId]);

	return (
		<Row className='g-4'>
			{filteredGroupContacts ? (
				<>
					<Col xxl={12}>
						<Row xxl={3}>
							<Col className='mx-auto'>
								<GroupContactsCard groupContacts={filteredGroupContacts} />
							</Col>
						</Row>
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
				</>
			) : (
				<Empty />
			)}
		</Row>
	);
});
