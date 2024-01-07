import React, { useEffect, useState } from "react";
import Box from "./Box";
import "./App.css";
import swal from 'sweetalert';

const clearstate = ["", "", "", "", "", "", "", "", ""];
const initialScore = { X: 0, O: 0, draw: 0 };

const App = () => {
  const [gameState, setGameState] = useState(clearstate);
  const [isXchance, setIschance] = useState(false);
  const [score, setScore] = useState(initialScore);

  const userClick = (index) => {
    let string = Array.from(gameState);
    if (string[index]) return;
    string[index] = isXchance ? "X" : "O";
    setIschance(!isXchance);
    setGameState(string);
  };

  const clearGame = () => {
  setGameState(clearstate);
  setIschance(false);
  setScore(initialScore);
};


  useEffect(() => {
    const checkWinner = () => {
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
        if (
          gameState[a] &&
          gameState[a] === gameState[b] &&
          gameState[a] === gameState[c]
        ) {
          return gameState[a];
        }
      }

      if (!gameState.includes("")) {
        return "draw"; // It's a draw
      }

      return null;
    };

    let result = checkWinner();
    if (result) {
      clearGame();
      updateScore(result);
      showResultAlert(result);
    }
  }, [gameState]);

  const updateScore = (result) => {
    setScore(prevScore => ({
      ...prevScore,
      [result]: prevScore[result] + 1,
    }));
  };

  const showResultAlert = (result) => {
    if (result === "draw") {
      swal({
        title: "It's a Draw!",
        text: "The game ended in a draw.",
        icon: "info",
        button: "Play again",
      });
    } else {
      swal({
        title: "Congratulations!",
        text: `${result} won the game `,
        icon: "success",
        button: "Play again",
      });
    }
  };

  return (
    <div className="header">
      <p className="header-text">TIC-TAC-TOE</p>
      <div className="scoreboard">
    <div className="score-container">
      <div className="score-text">X:</div>
      <div className="score-value">{score.X}</div>
    </div>
    <div className="score-container">
      <div className="score-text">O:</div>
      <div className="score-value">{score.O}</div>
    </div>
    <div className="score-container">
      <div className="score-text">Draw:</div>
      <div className="score-value">{score.draw}</div>
    </div>
      </div>
      <div className="row box-center border-top-down ">
        <Box onClick={() => userClick(0)} state={gameState[0]} />
        <Box className="inner-square" onClick={() => userClick(1)} state={gameState[1]} />
        <Box onClick={() => userClick(2)} state={gameState[2]} />
      </div>
      <div className="row box-center border-mid">
        <Box onClick={() => userClick(3)} state={gameState[3]} />
        <Box className="inner-square" onClick={() => userClick(4)} state={gameState[4]} />
        <Box onClick={() => userClick(5)} state={gameState[5]} />
      </div>
      <div className="row border-top-down">
        <Box onClick={() => userClick(6)} state={gameState[6]} />
        <Box className="inner-square" onClick={() => userClick(7)} state={gameState[7]} />
        <Box onClick={() => userClick(8)} state={gameState[8]} />
      </div>
      <button className="clear-btn" onClick={clearGame}>
        Clear Game
      </button>
    </div>
  );
};

export default App;
