import './app.css'
import { useEffect, useState } from "preact/hooks";
import { Card, getCards } from "./services/cardService.ts";
import Cards from "./Components/Cards.tsx";
import { shuffleArray } from "./utils/arrayUtils.ts";

export function App() {
  const [cards, setCards] = useState<Card[]>([]);
  const selectedCards = cards.filter(card => card.selected)
  console.log('selected cards:', selectedCards)

  useEffect(() => {
    (async () => {
      try {
        const fetchedCards = await getCards();
        setCards(fetchedCards);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    })();
  }, []);

  function clickCard(clickedCard: Card) {
    if (clickedCard.selected) {
      console.log(`card: ${clickedCard.cardName} has already been selected! Game Over!`);
      return; // Don't update state if the card was already selected
    }

    setCards(prevCards => {
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
        cards={cards}
        clickCard={clickCard}
      />
    </>
  );
}
