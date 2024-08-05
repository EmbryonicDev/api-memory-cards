import { shuffleArray } from "../utils/arrayUtils.ts";

type CardOption = {
	cardName: string;
  selected: boolean
}

export type Card = CardOption & {
	src: string
}

type GiphyResponse = {
  data: Array<{
    images: {
      original: {
        url: string;
      };
    };
  }>;
}

const API_KEYS = [
	'3FTyNkDNfXxt9t0X7TfSn0hkYuoTSWr5&q',
	'xhpHyLqQFhkzgvtrWtBj4D91W6b2OXXz&q',
	'6iGb9LD9uDLWaFisqYqe4WzfXFMaurWx&q'
];

export async function getCards(): Promise<Card[]> {
  const options = getRandomOptions()
  const cards = await Promise.all(options.map(async (card) => {
    const src = await fetchUrl(card.cardName);
    return { ...card, src };
  }));
	return cards
}

function getRandomOptions() {
	const cardsOptions = [
		"grave", "knife", "pistol", "skull", "cold", "poison", "axe", "ghost", "chain",
		"dagger", "sword", "bomb", "whiskey", "dream catcher", "stallion", "lock", "shackle", "spike",
		"guillotine", "no", "dungeon", "jail", "storm", "mummy", "lightbulb", "explosion",
		"crazy", "raven", "bat", "wolf", "spider", "scorpion", "vulture", "shark", "wasp",
		"lion", "rat", "crow", "mo	th", "cobra", "wasp", "nurse", "bear", "bone", "fire",
		"syringe", "worm", "mask", "priest", "lightning", "slime", "doll", "mirror", "candle",
		"oak", "ship", "sick", "feather", "throne", "crown", "scepter", "dragon",
		"enemy", "crying", "book", "crash", "secret", "chains", "death", "statue",
		"gargoyle", "moon", "witch", "insect", "spiderweb", "beer", "amulet",
		"frog", "scalpel", "crocodile", "monster", "stupid", "devil", "crossbow",
		"vampire", "hungry", "fear", "diamond", "snake", "anger", "dagger"
	]
	const shuffledOptions = shuffleArray(cardsOptions).slice(0, 31)
	const shuffledCardOptions: CardOption[] = []
	for (const option of shuffledOptions.slice(0, 6)) {
		const titledCard = option.charAt(0).toUpperCase() + option.slice(1)
		shuffledCardOptions.push({cardName: titledCard, selected: false})
	}
	return shuffledCardOptions
}

function fetchUrl(term: string): Promise<string> {
	return fetch(
		`https://api.giphy.com/v1/stickers/search?api_key=${API_KEYS[Math.floor(Math.random() * 2) + 1]}=${term}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
		{ mode: 'cors' }
	)
		.then((response: Response) => response.json())
		.then((result: GiphyResponse) => {
			const randomIndex = Math.floor(Math.random() * result.data.length);
			return result.data[randomIndex].images.original.url;
		})
		.catch((error: Error) => {
			console.error('Error:', error);
			return '';
		});
}
