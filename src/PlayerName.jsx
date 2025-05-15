import List from './List.jsx';
import PropTypes from 'prop-types';

PlayerName.propTypes = {
	PLAYER: PropTypes.shape({
		X: PropTypes.string.isRequired,
		O: PropTypes.string.isRequired,
	}).isRequired,
	activePlayer: PropTypes.string.isRequired,
	onNameChange: PropTypes.func.isRequired,
};

export default function PlayerName({ PLAYER, activePlayer, onNameChange }) {
	return (
		<>
			<List
				name={PLAYER.X}
				symbol='X'
				isActive={activePlayer === 'X'}
				onNameChange={onNameChange}
			/>
			<List
				name={PLAYER.O}
				symbol='O'
				isActive={activePlayer === 'O'}
				onNameChange={onNameChange}
			/>
		</>
	);
}
