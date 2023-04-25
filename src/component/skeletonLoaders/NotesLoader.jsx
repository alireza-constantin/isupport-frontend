import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

function NotesLoader() {
	return (
		<>
			<p
				className="text-xs sm:text-sm font-medium lead-7 rounded-sm max-w-[200px] sm:max-w-xs sm:px-4 px-2  py-2 relative 
		
			ml-auto"
			>
				<Skeleton width={130} height={40} />
			</p>
			<p
				className="text-xs sm:text-sm font-medium lead-7 rounded-sm max-w-[200px] sm:max-w-xs sm:px-4 px-2  py-2 relative 
		
			mr-auto"
			>
				<Skeleton width={130} height={40} />
			</p>
			<p
				className="text-xs sm:text-sm font-medium lead-7 rounded-sm max-w-[200px] sm:max-w-xs sm:px-4 px-2  py-2 relative 
		
			ml-auto"
			>
				<Skeleton width={130} height={40} />
			</p>
		</>
	);
}

export default NotesLoader;
