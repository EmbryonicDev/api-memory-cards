type GameInfoProps = {
	gameOver: boolean
	gameWon: boolean
	score: number
	unClickedCards: number
	level: number
}

export function GameInfo({gameOver, gameWon, score, unClickedCards, level}: GameInfoProps) {
	return (
		<div className="gameInfo">
			<h1 id="gameInfoTitle">GaMe InFo</h1>
			<h3 className="scoreText">Level: {level}</h3>
			<h3 className="scoreText">Score: {score}</h3>
			{gameOver || gameWon
				? null
				: <h3 className="scoreText">Find {unClickedCards} More Cards to Unlock the Next Level</h3>
			}
		</div>
	)
}
