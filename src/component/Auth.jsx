import { useAuthStatus } from '../hook/useAuthStatus';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from './Loader';

const Auth = ({ children }) => {
	const [isLoggedIn, checkStatus] = useAuthStatus();
	const location = useLocation();

	if (checkStatus) {
		return <Loader />;
	}

	return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} replace />;
};

export default Auth;
