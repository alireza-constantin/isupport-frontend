import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getAccessToken } from './feature/authSlice';
import { Header } from './component/Header';
import Auth from './component/Auth';
import { Home, Login, Me, Register, CreateTicket, Tickets, NotFound, Ticket, Notes } from './pages';
import Loader from './component/Loader';

function App() {
	const [loading, setLoading] = useState(false);

	const dispatch = useDispatch();
	useEffect(() => {
		setLoading(true);
		dispatch(getAccessToken())
			.unwrap()
			.then(() => setLoading(false))
			.catch((err) => setLoading(false));
	}, [dispatch]);

	if (loading) {
		return <Loader />;
	}

	return (
		<Router>
			<div className="lg:w-2/3 mx-auto px-8 lg:px-0 mb-10">
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/me" element={<Me />} />
					{/* Protected Routes */}
					<Route
						path="/create-ticket"
						element={
							<Auth>
								<CreateTicket />
							</Auth>
						}
					/>
					<Route
						path="/tickets"
						element={
							<Auth>
								<Tickets />
							</Auth>
						}
					/>
					<Route
						path="/tickets/:ticketId"
						element={
							<Auth>
								<Ticket />
							</Auth>
						}
					>
						<Route path="notes" element={<Notes />} />
					</Route>
					{/* backup not found route */}
					<Route path="/*" element={<NotFound />} />
				</Routes>
				<ToastContainer />
			</div>
		</Router>
	);
}

export default App;
