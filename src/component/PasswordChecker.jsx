import PropTypes from 'prop-types';

function PasswordChecker({ check, text }) {
	return (
		<div className="flex items-center gap-2 text-sm">
			<div
				style={{ backgroundColor: check && '#000', borderColor: check && '#000' }}
				className="w-3.5 h-3.5 border-2 border-solid border-gray-400"
			></div>
			{`At least ${text}`}
		</div>
	);
}

PasswordChecker.propTypes = {
	check: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
};

export default PasswordChecker;
