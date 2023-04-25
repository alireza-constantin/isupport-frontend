import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function TicketsLoader() {
	return (
		<>
			<div className="py-4 px-2 flex justify-between items-center border-b-2  border-solid border-gray-200">
				<div>
					<Skeleton width={180} height={18} />
					<Skeleton width={250} height={15} />
				</div>
				<div className="flex gap-6 text-xl items-center">
					<Skeleton circle={true} width={35} height={35} />
					<Skeleton circle={true} width={35} height={35} />
				</div>
			</div>
		</>
	);
}

export default TicketsLoader;
