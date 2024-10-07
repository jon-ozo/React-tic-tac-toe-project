import { useState } from "react";

import PlayerName from "./PlayerName.jsx";
import GameBoard from "./GameBoard.jsx";
import Log from "./Log.jsx";
import { WINNING_COMBINATIONS } from './winning-combinations.js';
import GameOver from "./GameOver.jsx";

const PLAYERS = { X: 'Player 1', O: 'Player 2'};
const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X')  currPlayer = 'O';

  return currPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(arr => [...arr])];
  
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];
  
    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

export default function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [ gameTurns, setGameTurns ] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const currPlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        { 
          square: { row: rowIndex, col: colIndex }, 
          player: currPlayer
        }, 
        ...prevTurns
      ];
      
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return { ...prevPlayers, [symbol]: newName }
    })
  }

  return (
    <article id='game-container'>
      <ol id='players' className='highlight-player'>
        <PlayerName PLAYER={PLAYERS} activePlayer={activePlayer} onNameChange={handlePlayerNameChange} />
      </ol>

      { (winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} /> }
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      <Log turns={gameTurns} />
    </article>
  );
}
