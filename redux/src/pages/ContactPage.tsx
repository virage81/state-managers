import { FC, useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { ContactCard } from 'src/components/ContactCard';
import { Empty } from 'src/components/Empty';
import { ContactDto } from 'src/types/dto/ContactDto';
import { CommonPageProps } from './types';

export const ContactPage: FC<CommonPageProps> = ({ contactsState }) => {
	const { contactId } = useParams<{ contactId: string }>();
	const [contact, setContact] = useState<ContactDto>();

	useEffect(() => {
		setContact(() => contactsState[0].find(({ id }) => id === contactId));
	}, [contactId]);

	return (
		<Row xxl={3}>
			<Col className={'mx-auto'}>{contact ? <ContactCard contact={contact} /> : <Empty />}</Col>
		</Row>
	);
};
