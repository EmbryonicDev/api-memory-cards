import './app.css'
import { useEffect, useState } from "preact/hooks";
import { Card, getCards } from "./services/cardService.ts";
import Cards from "./Components/Cards.tsx";
import { shuffleArray } from "./utils/arrayUtils.ts";

export function App() {
  const [allCards, setAllCards] = useState<Card[]>([]);
  const [visibleCards, setVisibleCards] = useState<Card[]>([]);
  const selectedCards = visibleCards.filter(card => card.selected)

  console.log('selected cards:', selectedCards)
  console.log('Cards:', allCards)
  console.log('Visible cards:', visibleCards)

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

  // Set visible cards
  useEffect(() => {
    if (allCards.length > 0 && !visibleCards.length) {
      setVisibleCards(allCards.slice(0, 6));
      setAllCards(allCards.slice(6))
    } else if (visibleCards.length > 0 && visibleCards.every(card => card.selected)) {
      console.log('all cards selected!')
      setVisibleCards(prevVisible  => {
        const newVisible = [...prevVisible, ...allCards.slice(0, 6)];
        setAllCards(allCards.slice(6))
        return shuffleArray(newVisible)
      })
    }
  }, [allCards, visibleCards])

  function clickCard(clickedCard: Card) {
    if (clickedCard.selected) {
      console.log(`card: ${clickedCard.cardName} has already been selected! Game Over!`);
      return; // Don't update state if the card was already selected
    }

    setVisibleCards(prevCards => {
      const updatedCards = prevCards.map(card =>
        card.cardName === clickedCard.cardName
          ? { ...card, selected: true }
          : card
      );

      // Shuffle the cards every time a new card is selected
      return shuffleArray(updatedCards);
    });
  }

  return (
    <>
      <Cards
        cards={visibleCards}
        clickCard={clickCard}
      />
    </>
  );
}
