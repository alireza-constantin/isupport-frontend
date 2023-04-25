import { FaTrash, FaTimesCircle, FaRegCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(255, 255, 255, 0.75)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		padding: '1rem',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

function TicketIcons({ onClick, closed, showModal, setShowModal, loading }) {
	Modal.setAppElement('#modal');
	return (
		<>
			<div className="flex gap-6 text-xl items-center ">
				<div onClick={() => setShowModal(true)} className="cursor-pointer">
					<FaTrash className="hover:scale-125" />
				</div>
				<div className="tooltip" data-tip={closed ? 'closed' : 'open'}>
					{closed ? <FaTimesCircle /> : <FaRegCircle />}
				</div>
			</div>
			<Modal
				isOpen={showModal}
				style={customStyles}
				onRequestClose={() => setShowModal(false)}
				contentLabel="delete ticket"
			>
				<div className=" w-80 border-2 font-semibold text-xl border-solid border-black p-8">
					<h1 className="text-center mb-10">Are You Sure ?</h1>
					<div className="flex justify-between items-center ">
						<button onClick={onClick} className={`btn text-lg ${loading ? 'loading' : ''}`}>
							Yes
						</button>
						<button onClick={() => setShowModal(false)} className="btn btn-outline text-lg">
							No
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}

TicketIcons.propTypes = {
	onClick: PropTypes.func.isRequired,
	closed: PropTypes.bool,
	showModal: PropTypes.bool,
	setShowModal: PropTypes.func,
	loading: PropTypes.bool,
};

export default TicketIcons;
