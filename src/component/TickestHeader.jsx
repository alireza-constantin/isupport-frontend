import { FaUserAlt, FaTimesCircle, FaRegCircle } from 'react-icons/fa';
import PropTypes from 'prop-types';

function TicketsHeader({ name, total, closed, open, onClick }) {
	const clickHandler = (e) => {
		onClick(e.target.id);
	};

	return (
		<>
			<div className="text-xl font-semibold mt-2 flex items-center gap-2">
				<FaUserAlt /> {name}
			</div>
			<div className="flex mt-4 flex-col pb-4 border-b-2 border-solid border-gray-300  sm:flex-row gap-4 justify-between">
				<h2 id="total" onClick={clickHandler} className="text-lg font-medium hover:text-gray-600 cursor-pointer">
					Total Tickets: {total}
				</h2>
				<div className="flex gap-3">
					<h3
						id="close"
						onClick={clickHandler}
						className="px-3 flex items-center gap-2 border-r-2 border-solid border-gray-400 text-sm hover:text-gray-600 cursor-pointer"
					>
						<FaTimesCircle /> {closed} Closed
					</h3>
					<h3
						id="open"
						onClick={clickHandler}
						className="flex items-center gap-2 text-sm hover:text-gray-600 cursor-pointer"
					>
						<FaRegCircle /> {open} Open
					</h3>
				</div>
			</div>
		</>
	);
}

TicketsHeader.propTypes = {
	name: PropTypes.string,
	total: PropTypes.number,
	closed: PropTypes.number,
	open: PropTypes.number,
	onClick: PropTypes.func.isRequired,
};

export default TicketsHeader;
