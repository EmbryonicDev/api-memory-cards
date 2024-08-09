import { useState } from "preact/hooks";
import {GameInfo} from "./GameInfo.tsx";

type headerProps = {
  score: number
  highScore: string
  level: number
  unClickedCards: number
  clickReset: () => void
  gameOver: boolean
  gameWon: boolean

}

function instructions() {
  return (
    <div id="instructions">
      <ul>
        <li>Each icon can be selected only once</li>
        <li>After selecting all icons in level 1 you will progress to level 2</li>
        <li>Each new level will contain all previously selected cards, as well as 6 new cards</li>
        <li>As the game progresses, the score value for each selection will systematically increase</li>
        <li>Complete all 5 levels to win the game</li>
      </ul>
    </div>
  )
}

export default function Header(props: headerProps) {
  const [showInstruction, setShowInstructions] = useState(false);
  const { score, highScore, level, unClickedCards, gameOver, gameWon, clickReset } = props;

  function handleMouseOver() {
    setShowInstructions(true);
  }

  function handleMouseOut() {
    setShowInstructions(false);
  }

  return (
    <div id="headerDiv">
      <div id="titleDiv">
        <h1 id="titleText">Memory Game</h1>
        <button id="infoButton"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >?</button>
        {showInstruction && instructions()}
        <button
          id="resetButton"
          onClick={clickReset}
        >
				Start New Game
			  </button>
      </div>
      < GameInfo
        gameOver={gameOver}
        gameWon={gameWon}
        score={score}
        highScore={highScore}
        unClickedCards={unClickedCards}
        level={level}
        clickReset={clickReset}
      />
      <div className="score">
        <h2>High Score</h2>
        <h2>{highScore}</h2>
      </div>
    </div>
  )
}