import { FaUserAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { registerUser } from '../feature/authSlice';
import PasswordChecker from '../component/PasswordChecker';
import ShowPasswordIcon from '../component/ShowPasswordIcon';

const required = { required: { value: true, message: 'This field can not be empty' } };

export function Register() {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [passwordCheck, setPasswordCheck] = useState({ min: false, char: false, digit: false });
	const {
		register,
		watch,
		setError,
		formState: { errors, isSubmitSuccessful },
		handleSubmit,
		reset,
	} = useForm();

	const navigate = useNavigate()
	const dispatch = useDispatch();

	// watching for password strength chekc
	useEffect(() => {
		const subscription = watch(({ password }, { name, type }) => {
			if (name === 'password' && type === 'change') {
				setPasswordCheck((prev) => ({
					...prev,
					char: /[A-Z]/.test(password),
					digit: /\d/.test(password),
					min: password.length > 7,
				}));
			}
		});

		return () => subscription.unsubscribe();
	}, [watch, passwordCheck]);

	// submitting the form
	const onSubmit = async (data) => {
		if (!passwordCheck.char || !passwordCheck.digit || !passwordCheck.min) {
			return;
		}

		if (data.password.trim() !== data.confirm.trim()) {
			setError(
				'confirm',
				{ type: 'custom', message: 'Confirm password should match the password' },
				{ shouldFocus: true }
			);
			return;
		}
		setLoading(true);

		try {
			await dispatch(registerUser(data)).unwrap();
			toast.success(`You register Succesfully, Please Login`);
			navigate('/login')
			setLoading(false);
		} catch (error) {
			toast.error(error);
			setLoading(false);
		}
	};

	// clear form and state after successfully submitting
	useEffect(() => {
		if (isSubmitSuccessful) {
			reset();
			setPasswordCheck((prev) => ({
				...prev,
				char: false,
				digit: false,
				min: false,
			}));
			setShowPassword(false);
		}
	}, [isSubmitSuccessful, reset]);

	return (
		<div className="flex  select-none flex-col items-center mt-16">
			<FaUserAlt size={50} className="mb-8" />
			<h1 className="text-xl text-center sm:text-3xl text-stone-400 font-bold">Please Create an Account</h1>
			<form className="form-control w-full   mt-10 sm:w-3/5 relative" onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register('name', required)}
					placeholder="please enter your name"
					className="border-2 rounded-sm border-stone-200 p-2 w-full placeholder:text-stone-400 placeholder:text-sm sm:placeholder:text-base"
				/>
				<p className="text-xs mt-2 text-red-400">{errors.name?.message}</p>
				<input
					{...register('email', {
						...required,
						pattern: {
							value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
							message: 'Please provide a valid email',
						},
					})}
					placeholder="please enter your email"
					className="border-2 rounded-sm border-stone-200 p-2 w-full mt-4 placeholder:text-stone-400 placeholder:text-sm sm:placeholder:text-base"
				/>
				<p className="text-xs mt-2 text-red-400">{errors.email?.message}</p>

				<div className="relative">
					<input
						{...register('password')}
						type={showPassword ? 'text' : 'password'}
						placeholder="please enter your password"
						className="border-2 rounded-sm border-stone-200 p-2 w-full mt-4 placeholder:text-stone-400 placeholder:text-sm sm:placeholder:text-base"
					/>
					<ShowPasswordIcon showPassword={showPassword} setShowPassword={setShowPassword} />
				</div>

				<div className="relative">
					<input
						{...register('confirm', required)}
						type={showPassword ? 'text' : 'password'}
						placeholder="please confirm your password"
						className="border-2 rounded-sm border-stone-200 p-2 w-full mt-4 placeholder:text-stone-400 placeholder:text-sm sm:placeholder:text-base"
					/>
					<ShowPasswordIcon showPassword={showPassword} setShowPassword={setShowPassword} />
				</div>
				<p className="text-xs mt-2 text-red-400">{errors.confirm?.message}</p>

				{/* Password Chekcer */}
				<div className="mt-5 flex flex-col gap-2">
					<p className="text-xs font-semibold">Password must have</p>
					<PasswordChecker check={passwordCheck.min} text="8 Character" />
					<PasswordChecker check={passwordCheck.char} text="one upper-case" />
					<PasswordChecker check={passwordCheck.digit} text="one digit" />
				</div>

				<button
					className={`btn mt-6 hover:bg-opacity-80 transition duration-200 ease-in ${loading && 'loading'}`}
					type="submit"
				>
					{!loading && 'Submit'}
				</button>
			</form>
			<p className="text-left text-xs text-gray-400 mt-5">
				After submitting check your email and follow the instruction in email.
			</p>
		</div>
	);
}
