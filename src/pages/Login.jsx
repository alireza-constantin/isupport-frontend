import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaSignInAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import { loginUser } from '../feature/authSlice';
import ShowPasswordIcon from '../component/ShowPasswordIcon';

const required = { required: { value: true, message: 'This field can not be empty' } };

export function Login() {
	const [showPassword, setShowPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || '/';

	const onSubmit = async (userData) => {
		console.log(userData)
		setLoading(true);
		try {
			await dispatch(loginUser(userData)).unwrap();
			navigate(from, { replace: true });
		} catch (error) {
			console.log(error)
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex flex-col items-center mt-16">
			<FaSignInAlt size={50} className="mb-8" />
			<h1 className="text-xl text-center  sm:text-3xl text-stone-400 font-bold">Please Login To Your Account</h1>
			<form className="form-control w-full  mt-10 sm:w-3/5 relative" onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('email', {
						...required,
						pattern: {
							value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
							message: 'Please provide a valid email',
						},
					})}
					placeholder="please enter your email"
					className="border-2 rounded-sm border-stone-200 p-2 w-full  placeholder:text-stone-400 placeholder:text-sm sm:placeholder:text-base"
				/>
				<p className="text-xs text-red-400 mt-2">{errors.email?.message}</p>

				<div className="relative">
					<input
						{...register('password', required)}
						type={showPassword ? 'text' : 'password'}
						placeholder="please enter your password"
						className="border-2 rounded-sm border-stone-200 p-2 w-full mt-4 placeholder:text-stone-400 placeholder:text-sm sm:placeholder:text-base "
					/>

					<ShowPasswordIcon showPassword={showPassword} setShowPassword={setShowPassword} />
				</div>
				<p className="text-xs text-red-400 mt-2">{errors.password?.message}</p>
				<button
					className={`btn mt-6 hover:bg-opacity-80 transition duration-200 ease-in ${loading && 'loading'}`}
					type="submit"
				>
					{!loading && 'Submit'}
				</button>
			</form>
		</div>
	);
}
