import {shuffleArray} from "../utils/arrayUtils.ts";

export type CardOption = {
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

export function getRandomOptions() {
 const cardsOptions = [
  "flower", "tree", "apple", "car", "dragon", "motorcycle", "butterfly", "donut", "sun",
  "moon", "star", "cloud", "umbrella", "book", "pencil", "guitar", "piano", "drum",
  "cat", "dog", "bird", "fish", "elephant", "giraffe", "lion", "tiger", "bear",
  "panda", "koala", "penguin", "dolphin", "whale", "octopus", "seahorse", "turtle",
  "frog", "bee", "ladybug", "ant", "spider", "butterfly", "dragonfly", "firefly",
  "rocket", "airplane", "train", "boat", "bicycle", "skateboard", "balloon", "kite",
  "castle", "house", "skyscraper", "bridge", "lighthouse", "windmill", "tent",
  "camera", "television", "computer", "phone", "watch", "glasses", "hat", "shoe",
  "pizza", "ice cream", "cake", "candy", "hamburger", "sushi", "taco", "popcorn",
  "soccer ball", "basketball", "football", "tennis racket", "baseball", "golf club",
  "paintbrush", "palette", "horse", "scissors", "needle", "thread", "compass", "map",
  "treasure chest", "key", "lock", "crown", "wand", "crystal ball"
	]
  const shuffledOptions = shuffleArray(cardsOptions).slice(0, 30);
  return shuffledOptions.map(option => ({
    cardName: option.charAt(0).toUpperCase() + option.slice(1),
    selected: false
  }));
}

export async function fetchCardImage(card: CardOption): Promise<Card> {
  const src = await fetchUrl(card.cardName);
  return { ...card, src };
}

function fetchUrl(term: string): Promise<string> {
	return fetch(
		`https://api.giphy.com/v1/stickers/search?api_key=${API_KEYS[Math.floor(Math.random() * 3) + 1]}=${term}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`,
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
