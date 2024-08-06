type GameInfoProps = {
	gameOver: boolean
	gameWon: boolean
	score: number
	highScore: string
	unSelectCards: number
	level: number
	clickReset: () => void
}

export function GameInfo({gameOver, gameWon, score, highScore, clickReset, unSelectCards, level}: GameInfoProps) {
	return (
		<div id="gameInfo">
			<div id="scoreDiv">
				<h1 id="gameInfoTitle">GaMe InFo</h1>
				<h3 className="scoreText">Level: {level}</h3>
				<h3 className="scoreText">Score: {score}</h3>
				<h3 className="scoreText">High Score: {highScore}</h3>
				{gameOver || gameWon
					? null
					: <h3 className="scoreText">Find {unSelectCards} More Cards to Unlock the Next Level</h3>
				}
			</div>
			<button
				id="resetButton"
				onClick={clickReset}
			>
				Start New Game
			</button>
		</div>
	)
}
