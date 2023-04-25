import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import TicketIcons from './TicketIcons';
import { deleteTicket } from '../feature/ticketSlice';
import { toast } from 'react-toastify';

function TicketItem({ ticket }) {
	const [loadingBtn, setLoadingBtn] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const dispatch = useDispatch();
	const onDeleteHandler = async () => {
		setLoadingBtn(true);
		try {
			await dispatch(deleteTicket(ticket._id)).unwrap();
			setLoadingBtn(false);
			setShowModal(false);
		} catch (error) {
			toast.error(error);
			setLoadingBtn(false);
			setShowModal(false);
		}
	};

	return (
		<div className="py-4 px-2 flex justify-between items-center border-b-2 hover:border-black hover:shadow-inner border-solid border-gray-200">
			<div>
				<Link to={`/tickets/${ticket._id}`}>
					<h4 className="font-medium">{ticket.product.toUpperCase()}</h4>
					<p className="font-normal text-gray-500">{ticket.title}</p>
					<div></div>
				</Link>
			</div>
			<TicketIcons
				loading={loadingBtn}
				setShowModal={setShowModal}
				showModal={showModal}
				closed={ticket.isClosed}
				onClick={onDeleteHandler}
			/>
		</div>
	);
}

TicketItem.propTypes = {
	ticket: PropTypes.shape({
		_id: PropTypes.string.isRequired,
		product: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
		isClosed: PropTypes.bool.isRequired,
	}),
};

export default TicketItem;
