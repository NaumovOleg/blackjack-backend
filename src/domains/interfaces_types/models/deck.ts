import { ICard, TCard, HAND } from './card';

export type TDeck = {
  cards: TCard[];
  deckId: string;
};

export interface IDeck {
  cards: ICard[];
  deckId: string;
  shuffle(): void;
  getNextCard(hand: HAND): ICard;
  calculatePoints(hand: HAND): number;
  toJSON(): TDeck;
}
