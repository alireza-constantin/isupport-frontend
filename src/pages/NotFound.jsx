import { FaBan } from 'react-icons/fa';

export function NotFound() {
	return (
		<div className="absolute text-center top-1/3 left-1/2 -translate-x-1/2">
			<div className="flex items-center">
				<FaBan size={120} className="mr-12 text-red-500" />
				<span className="text-9xl">404</span>
			</div>
			<h1 className="mt-10 text-6xl text-stone-500">Page Not Found</h1>
		</div>
	);
}
