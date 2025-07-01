import "/src/index.css";
import Die from "./components/Die";
import { useState, useEffect, useRef } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);
  // .every() checks if a condition is met for every element in an array.

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  function newGame() {
    setDice((oldDice) => generateAllNewDice());
  }

  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      )
    );
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        die.id === id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={hold}
      id={dieObj.id}
    />
  ));

  return (
    <>
      <main className="bg-[#f5f5f5] h-full rounded flex flex-col justify-evenly items-center">
        {gameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">
          {gameWon && (
            <p>Congratulations! You won! Press "New Game" to start again.</p>
          )}
        </div>
        <h1 className="m-0 text-4xl">Tenzies</h1>
        <p className="m-2 font-normal text-center">
          Role until all dices are the same. Click each die to freeze it as its
          current value between rolls.
        </p>
        <div className="grid grid-cols-5 gap-4 mb-10">{diceElements}</div>
        <button
          ref={buttonRef}
          className="h-12 w-auto py-1.5 px-5 whitespace-nowrap rounded bg-[#5035ff] text-white text-lg cursor-pointer"
          onClick={gameWon ? newGame : rollDice}
        >
          {gameWon ? "New Game" : "Roll"}
        </button>
      </main>
    </>
  );
}
