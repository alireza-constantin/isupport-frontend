import { FaApple, FaCalendar, FaCalendarCheck } from 'react-icons/fa';
import PropTypes from 'prop-types';

function TicketHeader({ created, updated, prod, isClosed }) {
	return (
		<>
			<div className="text-xl font-semibold mt-2 flex items-end gap-2">
				<FaApple size={30} /> <span className="leading-6">{prod}</span>
			</div>
			<div className="flex flex-col pb-6 gap-4 border-b-2 border-solid border-gray-300 sm:flex-row justify-between mt-6 text-gray-800 text-sm font-medium">
				<div className="flex gap-2 items-center">
					<FaCalendar size={15} /> Opened At :{' '}
					{created.toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })}
				</div>
				{isClosed && (
					<div className="flex gap-2 items-center">
						<FaCalendarCheck size={15} /> Closed At:{' '}
						{updated.toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' })}
					</div>
				)}
			</div>
		</>
	);
}

TicketHeader.propTypes = {
	prod: PropTypes.string,
	created: PropTypes.instanceOf(Date),
	updated: PropTypes.instanceOf(Date),
	isClosed: PropTypes.bool,
};

export default TicketHeader;
