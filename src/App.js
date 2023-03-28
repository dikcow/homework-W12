import * as React from "react";
import { useState } from "react";
import { Button, Stack, Text } from "@chakra-ui/react";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  const nextValue = calculateNextValue(squares);
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {
    if (winner || squares[square]) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return (
      <Button colorScheme="pink" textShadow="1px 1px #002B5B" margin="5" variant="solid" size="lg" className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </Button>
    );
  }

  return (
    <div>
      <Stack spacing={4} align="center" mt={5}>
        <div>{status}</div>
        <div>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>

        <div>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
        <Button colorScheme="telegram" size="md" onClick={restart}>
          RESTART
        </Button>
      </Stack>
    </div>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner ? `Winner : ${winner}` : squares.every(Boolean) ? `PERINGATAN : GADA YANG MENANG, RESTART!!` : `NEXT PLAYER : ${nextValue}`;
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <div className="app">
      <Text fontWeight="bold" fontSize="lg" align="center" mt={10}>
        <h1>HOMEWORK YANG SELALU BIKIN MENCREET</h1>
        <Game />
      </Text>
    </div>
  );
}

export default App;
