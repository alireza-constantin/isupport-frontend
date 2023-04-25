import { Outlet } from 'react-router-dom';
import { RiMessageFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import BackButton from '../component/BackButton';
import TicketHeader from '../component/TicketHeader';
import { getTicket, resetTicket, closeTicket } from '../feature/ticketSlice';
import { toast } from 'react-toastify';

export function Ticket() {
	const { ticketId } = useParams();
	const location = useLocation();
	const [closeTicketBtnLoading, setCloseTicketBtnLoading] = useState(false);
	const dispatch = useDispatch();
	const { auth, ticket } = useSelector((state) => state);

	useEffect(() => {
		if (auth.status === 'succeeded') {
			dispatch(getTicket(ticketId));
		}

		return () => dispatch(resetTicket());
	}, [dispatch, ticketId, auth.status]);

	// closing the ticket
	const onClose = () => {
		setCloseTicketBtnLoading(true);
		dispatch(closeTicket(ticketId))
			.unwrap()
			.then((_) => {
				toast.success('Ticket Closed Successfully');
				setCloseTicketBtnLoading(false);
			})
			.catch((err) => {
				toast.error(err);
				setCloseTicketBtnLoading(false);
			});
	};

	return (
		<div className="mt-16">
			<BackButton />
			<div className="border-2 flex rounded-sm flex-col gap-2 p-4 border-stone-800 border-solid mt-4">
				{ticket.ticket ? (
					<TicketHeader
						created={new Date(ticket.ticket.createdAt)}
						updated={new Date(ticket.ticket.updatedAt)}
						prod={ticket.ticket.product.toUpperCase()}
						isClosed={ticket.ticket.isClosed}
					/>
				) : (
					<Skeleton />
				)}
				<div className="mt-6">
					<h1 className="text-lg font-medium">{ticket.ticket ? ticket.ticket.title : <Skeleton />}</h1>
					<p className="mt-4 text-sm sm:text-base leading-7 text-gray-700">
						{ticket.ticket ? ticket.ticket.description : <Skeleton />}
					</p>
				</div>
				{ticket.ticket ? (
					<button
						onClick={onClose}
						disabled={ticket?.ticket?.isClosed}
						className={`btn btn-outline mt-6 ${closeTicketBtnLoading ? 'loading' : ''}`}
					>
						{ticket?.ticket?.isClosed ? 'Closed' : 'Close'}
					</button>
				) : (
					<Skeleton />
				)}
			</div>
			{!location.pathname.includes('notes') && (
				<div className="flex ml-2 mt-4">
					<Link
						className="flex font-medium items-center transition-all duration-150 ease-in pb-1 border-b-2 border-solid border-transparent hover:border-gray-700"
						to="notes"
					>
						<RiMessageFill className="mr-2" />
						see notes
					</Link>
				</div>
			)}

			<Outlet />
		</div>
	);
}
