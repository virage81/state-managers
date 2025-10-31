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
					<Nav.Link>
						<Link to='/groups'>Группы</Link>
					</Nav.Link>
					<Nav.Link>
						<Link to='/favorite'>Favorite</Link>
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};
