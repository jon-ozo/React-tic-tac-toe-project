import List from './List.jsx';

export default function PlayerName({ PLAYER, activePlayer, onNameChange }) {
  return (
    <>
      <List name={PLAYER.X} symbol='X' isActive={activePlayer === 'X'} onNameChange={onNameChange} />
      <List name={PLAYER.O} symbol='O' isActive={activePlayer === 'O'} onNameChange={onNameChange} />
    </>
  );
}