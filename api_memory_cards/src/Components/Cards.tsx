import {Card} from "../services/cardService.ts";

type CardProps = {
  card: Card
  clickCard?: (card: Card) => void
}

type CardsProps = {
  cards: Card[]
  clickCard?: (card: Card) => void
}

function NewCard({card, clickCard}: CardProps) {
  const {src, cardName, selected} = card
  return (
      <img className="cardImage"
        onClick={() => clickCard?.(card)}
        src={src}
        alt={cardName}
        selected={selected}
      />
  )
}

export default function Cards({cards, clickCard}: CardsProps) {
  return (
    <div id="cardsContainer">
      {cards.map((card) => (
        <NewCard key={card.cardName} card={card} clickCard={clickCard} />
        ))}
    </div>
  )
}
