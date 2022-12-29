import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from './components/Card';
import Scoreboard from './components/Scoreboard';
import { v4 as uuidv4 } from 'uuid';
import Confetti from 'react-confetti';

function App() {
  const [characters, setCharacters] = useState(() => []);
  const [tries, setTries] = useState(() => 0);
  const [choiceOne, setChoiceOne] = useState(() => null);
  const [choiceTwo, setChoiceTwo] = useState(() => null);
  const [disabled, setDisabled] = useState(() => false);
  const [win, setWin] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetch('https://rickandmortyapi.com/api/character');
      const response = await data.json();
      const results = response.results;
      const characters = results.slice(0, 4);

      setCharacters(
        [...characters, ...characters]
          .map((character) => ({ ...character, matched: false }))
          .sort(() => Math.random() - 0.5)
      );
      setWin(false);
    })();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.id === choiceTwo.id) {
        setCharacters((prevCards) => {
          return prevCards.map((card) => {
            if (card.id === choiceOne.id) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetChoices();
      } else {
        setTimeout(() => resetChoices(), 1000);
      }
    } else {
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    const allMatch = characters.every((character) => character.matched);
    allMatch ? setWin(true) : '';
  }, [characters]);

  const resetChoices = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTries((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  const shuffleNewCards = () => {
    const shuffledCards = characters
      .map((character) => ({ ...character, matched: false }))
      .sort(() => Math.random() - 0.5);
    setCharacters(shuffledCards);
  };

  const startGame = () => {
    if (!win) {
      shuffleNewCards();
      setChoiceOne(null);
      setChoiceTwo(null);
      setTries(0);
    } else {
      setWin(false);
      shuffleNewCards();
    }
  };

  const chooseCard = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  return (
    <AppStyled className='App'>
      {win && <Confetti />}
      <h1>Memory Game</h1>
      <Scoreboard tries={tries} />
      <button onClick={startGame}>New Game</button>
      <Board>
        {characters.map((card) => (
          <Card
            key={uuidv4()}
            img={card.image}
            chooseCard={() => chooseCard(card)}
            disabled={disabled}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          />
        ))}
      </Board>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > * {
    margin: 16px 0px;
  }
`;
const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(150px, 200px));
  gap: 20px;
`;

export default App;
