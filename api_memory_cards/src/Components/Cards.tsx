function NewCard({card, clickCard}) {
  const {src, cardName, selected} = card
  return (
    <div className="cardDiv"  onClick={() => clickCard(card)}>
      <p className="cardTitle">{cardName}</p>
      <img className="cardImage"
        src={src}
        alt={cardName}
        selected={selected}
      />
    </div>
  )
}

export default function Cards({cards, clickCard}) {
  return (
    <div id="cardsContainer">
      {cards.map((card) => (
        <NewCard key={card.cardName} card={card} clickCard={clickCard} />
        ))}
    </div>
  )
}
