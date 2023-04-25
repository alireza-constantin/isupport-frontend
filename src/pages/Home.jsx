import { Link } from 'react-router-dom';
import { FaTicketAlt, FaQuestionCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux';

export function Home() {
	const { user } = useSelector((state) => state.auth);

	return (
		<div className="mt-16 text-center flex flex-col ">
			{user?.isStaff ? (
				<>
					<h1 className="text-5xl font-bold">Hello {user?.name}</h1>
					<h1 className="text-4xl font-bold  text-stone-400 mb-12 mt-8">Please Be Patient With Our Customers</h1>
					<Link className="btn btn-outline" to="/tickets">
						<FaQuestionCircle className="mr-2" /> See All The Tickets
					</Link>
				</>
			) : (
				<>
					<h1 className="text-5xl font-bold">What do you need help with?</h1>
					<h1 className="text-4xl font-bold  text-stone-400 mb-12 mt-8">Please chose from option below</h1>
					<Link className="btn btn-outline" to="/create-ticket">
						<FaQuestionCircle className="mr-2" /> Create New Ticket
					</Link>
					<Link className="btn mt-4 hover:bg-opacity-90 transition duration-200" to="tickets">
						<FaTicketAlt className="mr-2" /> View My Tickets
					</Link>
				</>
			)}
		</div>
	);
}

// export default Home;
