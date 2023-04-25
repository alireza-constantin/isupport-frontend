import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { getAllTickets } from '../feature/ticketSlice';
import BackButton from '../component/BackButton';
import TicketItem from '../component/TicketItem';
import TicketsHeader from '../component/TickestHeader';
import TicketsLoader from '../component/skeletonLoaders/TicketsLoader';
import { toast } from 'react-toastify';

function filterTickets(tickets, type, setFilter) {
	if (type === 'total') {
		setFilter(tickets);
	} else if (type === 'close') {
		setFilter(tickets.filter((ticket) => ticket.isClosed));
	} else if (type === 'open') {
		setFilter(tickets.filter((ticket) => !ticket.isClosed));
	}
}

function getLength(tickets, isClosed) {
	if (isClosed) {
		return tickets.filter((ticket) => ticket.isClosed).length;
	}
	return tickets.filter((ticket) => !ticket.isClosed).length;
}

export function Tickets() {
	const [tickets, setTickets] = useState(null);
	const [filteredTickets, setFilterTickets] = useState(null);
	const [loading, setLoading] = useState(true);
	const { auth, ticket } = useSelector((state) => state);

	const dispatch = useDispatch();
	useEffect(() => {
		// checking to see if user logged in or not
		if (auth.status === 'succeeded')
			dispatch(getAllTickets())
				.unwrap()
				.then((_) => {
					// setTickets for when we want a copy of original tickets array for fitering purpose
					setTickets(ticket?.tickets);
					setFilterTickets(ticket?.tickets);
				})
				.catch((err) => toast.error(err))
				.finally(() => setLoading(false));
	}, [dispatch, auth.status, ticket.tickets]);

	const filterHandler = (id) => {
		filterTickets(tickets, id, setFilterTickets);
	};

	return (
		<div className="mt-16">
			<BackButton />
			<div className="border-2 flex rounded-sm flex-col gap-2 p-4 border-stone-800 border-solid mt-4">
				<TicketsHeader
					name={auth?.user?.name}
					total={!tickets ? 0 : tickets?.length}
					closed={!tickets ? 0 : getLength(tickets, true)}
					open={!tickets ? 0 : getLength(tickets, false)}
					onClick={filterHandler}
				/>
				<div className="mt-2 ">
					{!filteredTickets && loading
						? Array.from({ length: 3 }, (_, i) => <TicketsLoader key={i} />)
						: filteredTickets.map((ticket, idx) => <TicketItem ticket={ticket} key={ticket._id} />)}
				</div>
				<div></div>
			</div>
		</div>
	);
}
