import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { createTicket } from '../feature/ticketSlice';
import { toast } from 'react-toastify';

const required = { required: { value: true, message: 'This field can not be empty' } };

export function CreateTicket() {
	const [loading, setLoading] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (ticketData) => {
		setLoading(true);
		try {
			await dispatch(createTicket(ticketData)).unwrap();
			toast.success('Ticket Created Successfully');
			navigate('/tickets');
		} catch (error) {
			toast.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="mt-16">
			<div className="flex flex-col items-center mt-16">
				<FaEdit size={50} className="mb-8" />
				<h1 className="text-xl text-center  sm:text-3xl text-stone-400 font-bold">Create A New Ticket</h1>
				<form className="form-control w-full  mt-10 sm:w-3/5 relative" onSubmit={handleSubmit(onSubmit)}>
					<input
						{...register('title', {
							...required,
							minLength: {
								value: 5,
								message: 'Title can not be less than 5 char',
							},
						})}
						placeholder="please enter a title"
						className="border-2 rounded-sm border-stone-200 p-2 w-full  placeholder:text-stone-400 placeholder:text-sm sm:placeholder:text-base"
					/>
					<p className="text-xs text-red-400 mt-2">{errors.title?.message}</p>
					<select
						className="border-2 rounded-sm border-stone-200 p-2 w-full  placeholder:text-stone-400 mt-4"
						{...register('product', required)}
					>
						<option value="iphone 13 pro max">iPhone 13 Pro Max</option>
						<option value="iphone 13 pro">iPhone 13 Pro</option>
						<option value="iphone 13">iPhone 13</option>
						<option value="ipad pro">iPad Pro</option>
						<option value="ipad air">iPad Air</option>
						<option value="mac book pro">Mac Book Pro</option>
						<option value="mac book air">Mac Book Air</option>
					</select>
					<textarea
						{...register('description', {
							...required,
							minLength: {
								value: 20,
								message: 'description can not be less than 20 character',
							},
						})}
						rows={5}
						placeholder="please enter a description"
						className="border-2 rounded-sm border-stone-200 p-2 w-full mt-4 placeholder:text-stone-400 placeholder:text-sm sm:placeholder:text-base "
					/>

					<p className="text-xs text-red-400 mt-2">{errors.description?.message}</p>
					<button
						className={`btn mt-6 hover:bg-opacity-80 transition duration-200 ease-in ${loading && 'loading'}`}
						type="submit"
					>
						{!loading && 'Submit'}
					</button>
				</form>
			</div>
		</div>
	);
}
