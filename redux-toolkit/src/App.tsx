import { ThemeProvider } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from 'src/components/Layout';
import { ContactListPage, ContactPage, FavoriteListPage, GroupListPage, GroupPage } from 'src/pages';
import './App.scss';
import { store } from './store';

export const App = () => {
	return (
		<Provider store={store}>
			<ThemeProvider breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']} minBreakpoint='xxs'>
				<BrowserRouter>
					<Routes>
						<Route path='/' element={<Layout />}>
							<Route index element={<ContactListPage />} />
							<Route path='contact'>
								<Route index element={<ContactListPage />} />
								<Route path=':contactId' element={<ContactPage />} />
							</Route>
							<Route path='groups'>
								<Route index element={<GroupListPage />} />
								<Route path=':groupId' element={<GroupPage />} />
							</Route>
							<Route path='favorite' element={<FavoriteListPage />} />
						</Route>
					</Routes>
				</BrowserRouter>
			</ThemeProvider>
		</Provider>
	);
};
