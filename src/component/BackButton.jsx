import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function BackButton() {
	const navigate = useNavigate();

	return (
		<button className="btn btn-outline" onClick={() => navigate(-1)}>
			<FaArrowLeft className="mr-2" />
			Go back
		</button>
	);
}

export default BackButton;
