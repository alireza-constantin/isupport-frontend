import { FaLock, FaLockOpen } from 'react-icons/fa';

function ShowPasswordIcon({ bottom, showPassword, setShowPassword }) {
	return showPassword ? (
		<FaLockOpen
			onClick={() => setShowPassword(!showPassword)}
			className={`absolute right-2 bottom-[15px]  cursor-pointer`}
		/>
	) : (
		<FaLock
			onClick={() => setShowPassword(!showPassword)}
			className={`absolute right-2 bottom-[15px]  cursor-pointer`}
		/>
	);
}

export default ShowPasswordIcon;
