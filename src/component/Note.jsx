import PropTypes from 'prop-types';
import clsx from 'clsx';

function Note({ isStaff, text, time }) {
	const hour = time.toLocaleString('en-us', { hour: 'numeric', minute: '2-digit' });

	return (
		<p
			className={`text-xs sm:text-sm font-medium leading-5 rounded-sm max-w-[200px] sm:max-w-xs sm:px-4 px-2  py-2 relative 
		after:absolute after:-top-0 animate-note after:border-solid after:border-b-transparent after:rounded-sm after:border-8 ${clsx(
			isStaff ? 'ml-auto' : 'mr-auto',
			isStaff ? 'text-gray-200' : 'text-gray-900',
			isStaff ? 'bg-stone-800' : 'bg-stone-300',
			isStaff ? 'after:-right-3' : 'after:-left-3',
			isStaff ? 'after:border-stone-800' : 'after:border-stone-300',
			isStaff ? 'after:border-r-transparent' : 'after:border-l-transparent'
		)}`}
		>
			{text} <span className="flex justify-end opacity-70">{hour}</span>
		</p>
	);
}

Note.propTypes = {
	isStaff: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	time: PropTypes.instanceOf(Date).isRequired,
};

export default Note;
