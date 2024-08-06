import './app.css'
import { useEffect, useState } from "preact/hooks";
import { Card, getCards } from "./services/cardService.ts";
import Cards from "./Components/Cards.tsx";
import { shuffleArray } from "./utils/arrayUtils.ts";

export function App() {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [visibleCards, setVisibleCards] = useState<Card[]>([]);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false)
  const [loserCard, setLoserCard] = useState<Card[]>([])
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || '0');
  const [scoreMultiplier, setScoreMultiplier] = useState(5)
  const [score, setScore] = useState(0)

  console.log(`Score: ${score}`)
  console.log(`High Score: ${highScore}`)


  // Fetch all Cards
  useEffect(() => {
    (async () => {
      try {
        const fetchedCards = await getCards();
        setAllCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    })();
  }, []);

  useEffect(() => {
    localStorage.setItem('highScore', highScore)
  }, [highScore])

  // Set visible cards && remove them from allCards
  useEffect(() => {
    if (allCards.length > 0 && !visibleCards.length) {
      setVisibleCards(allCards.slice(0, 2));
      setAllCards(allCards.slice(2));
    } else if (visibleCards.length > 0 && visibleCards.every(card => card.selected)) {
      if (visibleCards.length === 12) {
        setScore(prevState => prevState + scoreMultiplier)
        getHighScore()
        setGameWon(true)
        // Don't do anything else, game is over
      } else {
        setVisibleCards(prevVisible => {
          const newVisible = [...prevVisible, ...allCards.slice(0, 2)];
          return shuffleArray(newVisible);
        });
          setAllCards(allCards.slice(2));
          setScoreMultiplier(prevState => prevState + 5)
      }
    }
  }, [allCards, visibleCards])

  function getHighScore() {
    if (score > parseInt(highScore)) setHighScore(score.toString())
  }

  function clickCard(clickedCard: Card) {
    if (clickedCard.selected) {
      console.log(`card: ${clickedCard.cardName} has already been selected! Game Over!`);
      getHighScore()
      setLoserCard([clickedCard])
      setGameOver(true)
    } else {
      setScore(prevState => prevState + scoreMultiplier)
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

  return (
    <>
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
