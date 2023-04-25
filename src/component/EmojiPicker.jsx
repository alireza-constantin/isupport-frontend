import Picker from 'emoji-picker-react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(255, 255, 255, 0.45)',
	},
	content: {
		top: 'auto',
		left: '40%',
		right: 'auto',
		bottom: '-4%',
		padding: '2px',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	},
};

function EmojiPicker({ showModal, setShowModal, setNote }) {
	Modal.setAppElement('#modal');

	return (
		<Modal
			isOpen={showModal}
			style={customStyles}
			onRequestClose={() => setShowModal(false)}
			contentLabel="Emoji Picker"
		>
			<div>
				<Picker
					onEmojiClick={(e, obj) => setNote((prev) => (prev += obj.emoji))}
					disableSkinTonePicker={true}
					native={true}
					groupVisibility={{
						flags: false,
						travel_places: false,
						activities: false,
						symbols: false,
						animals_nature: false,
					}}
				/>
			</div>
		</Modal>
	);
}

EmojiPicker.propTypes = {
	showModal: PropTypes.bool.isRequired,
	setShowModal: PropTypes.func.isRequired,
	setNote: PropTypes.func.isRequired,
};

export default EmojiPicker;
