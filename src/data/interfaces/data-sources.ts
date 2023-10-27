import { TDeck } from '@src/domains/interfaces_types/models';

export interface IDeckSource {
  create(deck: TDeck): Promise<TDeck>;
  get(deckId: string): Promise<TDeck | null>;
  update(deckId: string, data: TDeck): Promise<TDeck | null>;
}
