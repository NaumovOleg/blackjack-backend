import { TDeck } from '@src/domains/interfaces_types/models';

export interface IDeckModel {
  create(deck: TDeck): Promise<TDeck>;
  get(deckId: string): Promise<TDeck | null>;
  update(deckId: string, data: TDeck): Promise<TDeck | null>;
}
export interface ICardModel {
  get(deckId: string): Promise<TDeck | null>;
  get(deckId: string, hand: TDeck): Promise<TDeck | null>;
}
