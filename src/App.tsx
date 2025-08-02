import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './pages/Auth/AuthContext';
import { TicketProvider } from './components/StudentTickets/TicketContext';

function App() {
	return (
		<>
			<BrowserRouter>
				<AuthProvider>
					<TicketProvider>
					<AppRoutes />
					<Toaster
						position='top-right'
						toastOptions={{
							duration: 4000,
							style: {
								background: '#363636',
								color: '#fff',
							},
							success: {
								duration: 3000,
								style: {
									background: '#10B981',
									color: '#fff',
								},
							},
							error: {
								duration: 4000,
								style: {
									background: '#EF4444',
									color: '#fff',
								},
							},
						}}
					/>
					</TicketProvider>
				</AuthProvider>
			</BrowserRouter>
		</>
	);
}

export default App;
