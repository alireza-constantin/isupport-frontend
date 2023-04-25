import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { logoutUser } from '../feature/authSlice';
import { reset } from '../feature/ticketSlice';

export function Header() {
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = async () => {
		dispatch(logoutUser())
			.unwrap()
			.then(() => toast.success(`${user.name} logged out successfully`))
			.catch((err) => {
				toast.error(err);
			});
		// reset tickets store
		dispatch(reset());
	};

	return (
		<nav className="flex justify-between border-b-2 py-6">
			<div>
				<Link className="font-extrabold text-sm sm:text-2xl" to="/">
					iSupport
				</Link>
			</div>
			<div className="flex">
				{user ? (
					<button onClick={handleLogout} className="flex items-center text-sm sm:text-base hover:text-stone-500">
						<FaSignOutAlt className="mr-1.5" /> Logout
					</button>
				) : (
					<>
						<Link to="/login" className="flex items-center text-sm sm:text-base hover:text-stone-500">
							<FaSignInAlt className="mr-1.5" /> Login
						</Link>
						<Link to="/register" className="flex ml-4 items-center text-sm sm:text-base hover:text-stone-500">
							<FaUser className="mr-1.5" /> Register
						</Link>
					</>
				)}
			</div>
		</nav>
	);
}
