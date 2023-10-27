import { IDeck, HAND, ICard } from './models';

export interface IDeckRepository {
  createNewDeck(): Promise<IDeck>;
  findDeck(deckId: string): Promise<IDeck | undefined>;
  updateDeck(deckId: string, data: IDeck): Promise<IDeck | undefined>;
}
export interface ICardRepository {
  pick(deckId: string, hand: HAND): Promise<ICard>;
}
