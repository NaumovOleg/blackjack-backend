import { ICard, HAND, TDeck, IDeck } from './models';

export interface IPickCard {
  exec(deckId: string, hand: HAND): Promise<ICard[]>;
  pickUntil17Points(deck: IDeck, cardList: ICard[]): ICard[];
}

export interface IStartGame {
  exec(): Promise<TDeck>;
}

export interface IEndGame {
  exec(deckId: string): Promise<{ [HAND.PLAYER]: number; [HAND.DEALER]: number }>;
}
