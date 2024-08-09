import './app.css';
import { useEffect, useState, useCallback } from "preact/hooks";
import { Card, CardOption, getRandomOptions, fetchCardImage } from "./services/cardService.ts";
import Cards from "./Components/Cards.tsx";
import { shuffleArray } from "./utils/arrayUtils.ts";
import Header from "./Components/Header.tsx";

export function App() {
  const [allCardOptions, setAllCardOptions] = useState<CardOption[]>([]);
  const [visibleCards, setVisibleCards] = useState<Card[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [loserCard, setLoserCard] = useState<Card[]>([]);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || '0');
  const [scoreMultiplier, setScoreMultiplier] = useState(5);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  const unClickedCards = visibleCards.filter(card => !card.selected).length;

  const initializeCardOptions = useCallback(() => {
    const options = getRandomOptions();
    setAllCardOptions(options);
  }, []);

  useEffect(() => {
    initializeCardOptions();
  }, [initializeCardOptions]);

  useEffect(() => {
    localStorage.setItem('highScore', highScore);
  }, [highScore]);

  useEffect(() => {
    getHighScore();
  }, [gameWon, gameOver]);

  useEffect(() => {
    const cardsPerLevel = 6;
    const levels = 5;
    (async () => {
      async function addVisibleCards() {
        if (allCardOptions.length > 0 && visibleCards.length < cardsPerLevel) {
          const newCards = await Promise.all(
            allCardOptions.slice(0, cardsPerLevel - visibleCards.length).map(fetchCardImage)
          );
          setVisibleCards(prevVisible => [...prevVisible, ...newCards]);
          setAllCardOptions(prevOptions => prevOptions.slice(cardsPerLevel - visibleCards.length));
        } else if (visibleCards.length > 0 && visibleCards.every(card => card.selected)) {
            if (visibleCards.length === cardsPerLevel * levels) {
              setGameWon(true);
            } else {
              const newCards = await Promise.all(allCardOptions.slice(0, cardsPerLevel).map(fetchCardImage));
              setVisibleCards(prevVisible => {
                const newVisible = [...prevVisible, ...newCards];
                return shuffleArray(newVisible);
              });
              setAllCardOptions(prevOptions => prevOptions.slice(cardsPerLevel));
              setScoreMultiplier(prevState => prevState + 5);
              setLevel(prevState => prevState + 1);
            }
        }
      }
      await addVisibleCards();
    })();
  }, [allCardOptions, visibleCards, scoreMultiplier]);

  function getHighScore() {
    if (score > parseInt(highScore)) setHighScore(score.toString());
  }

  function clickCard(clickedCard: Card) {
    if (clickedCard.selected) {
      setLoserCard([clickedCard]);
      setGameOver(true);
    } else {
      setScore(prevState => prevState + scoreMultiplier);
      setVisibleCards(prevCards => {
        const updatedCards = prevCards.map(card =>
          card.cardName === clickedCard.cardName
            ? { ...card, selected: true }
            : card
        );
        return shuffleArray(updatedCards);
      });
    }
  }

  async function resetGame() {
    getHighScore();
    setScoreMultiplier(5);
    setLoserCard([]);
    setGameOver(false);
    setGameWon(false);
    initializeCardOptions();
    setScore(0);
    setVisibleCards([]);
    setLevel(1);
  }

  return (
    <>
      <Header
        score={score}
        highScore={highScore}
        level={level}
        unClickedCards={unClickedCards}
        gameOver={gameOver}
        gameWon={gameWon}
        clickReset={resetGame}
      />
      {!gameWon && !gameOver &&
        <Cards
          cards={visibleCards}
          clickCard={clickCard}
        />
      }
      {gameWon && <h1>You Won!</h1>}
      {gameOver &&(
        <>
          <h1>Game Over!</h1>
          <h3>You Selected this Card Twice!</h3>
          <Cards
            cards={loserCard!}
          />
        </>
      )}
    </>
  );
}
