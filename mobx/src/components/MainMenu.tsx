import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MainMenu = () => {
	return (
		<Navbar bg='light' expand='lg'>
			<Container>
				<Navbar.Brand href='/'>
					<h1>Книга контактов</h1>
				</Navbar.Brand>
				<Nav className='me-auto'>
					<Link to='/groups' className='my-auto mx-1'>
						Группы
					</Link>

					<Link to='/favorite' className='my-auto mx-1'>
						Favorite
					</Link>
				</Nav>
			</Container>
		</Navbar>
	);
};
