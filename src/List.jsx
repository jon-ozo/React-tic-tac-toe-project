import { useState } from 'react';

export default function List({ name, symbol, isActive, onNameChange }) {
  const [ playerName, setName ] = useState(name);
  const [ edit, setEdit ] = useState(false);

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleClick() {
    setEdit(edit => !edit);
    
    if (edit) {
      onNameChange(symbol, playerName);
    }
  }

  return (
    <li className={isActive ? 'active' : ''}>
      <span className='player'>
        {!edit ? playerName : (<input type='text' value={playerName} onChange={handleChange} />)}
      </span>
      <span className='player-symbol'>{symbol}</span>
      <span>
        <button onClick={handleClick}>{!edit ? 'Edit' : 'Save'}</button>
      </span>
    </li>
  );
}