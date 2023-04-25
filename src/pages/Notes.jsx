import { useState, useEffect, Fragment } from 'react';
import { FaRegSmile } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import EmojiPicker from '../component/EmojiPicker';
import Note from '../component/Note';
import { getNotes, createNote, reset } from '../feature/noteSlice';
import NotesLoader from '../component/skeletonLoaders/NotesLoader';

export function Notes() {
	const [note, setNote] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [getNoteLoading, setGetNoteLoading] = useState(true);
	const { notes } = useSelector((state) => state.note);

	const { ticketId } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getNotes(ticketId))
			.unwrap()
			.then(() => setGetNoteLoading(false))
			.catch((err) => {
				toast.error(err);
				setGetNoteLoading(false);
			});

		return () => dispatch(reset());
	}, [dispatch, ticketId]);

	const onCreateNote = async () => {
		dispatch(createNote({ ticketId, note }));
		setNote('');
	};

	return (
		<div className=" flex flex-col  p-6 rounded-sm border-2 border-solid border-black  mt-4">
			<div className="flex flex-col gap-6 items-center min-h-16">
				<div className="flex items-center rounded-md border-r-transparent w-full mr-0 md:w-3/5 mb-6 border-2 border-solid border-zinc-700 select-none">
					<FaRegSmile
						onClick={() => setShowModal(true)}
						size={30}
						className="pl-2 text-zinc-700 cursor-pointer hover:text-black"
					/>
					{/* Modal */}
					<EmojiPicker showModal={showModal} setShowModal={setShowModal} setNote={setNote} />
					<input
						type="text"
						placeholder="Note"
						value={note}
						onChange={({ target }) => setNote(target.value)}
						className="focus:outline-none text-xs sm:text-base w-1/2 sm:w-fit flex-1 pl-2 sm:pl-4"
					/>
					<button onClick={onCreateNote} className="btn btn-accent ml-1 text-xs sm:text-sm sm:px-[1rem] px-[0.6rem]">
						Send
					</button>
				</div>

				{!getNoteLoading ? (
					notes?.length > 0 ? (
						notes.map((note, idx) => {
							const date = new Date(note.createdAt);
							const time = date.toLocaleString('en-us', { month: 'long', day: 'numeric' });

							return (
								<Fragment key={note._id}>
									<p className="text-sm text-gray-400">{time}</p>
									<Note isStaff={note.isStaff} text={note.text} time={date} />{' '}
								</Fragment>
							);
						})
					) : (
						<h1 className="mt-4 text-gray-600 font-semibold">There isn't any notes write new one if you want</h1>
					)
				) : (
					<NotesLoader />
				)}
			</div>
		</div>
	);
}
