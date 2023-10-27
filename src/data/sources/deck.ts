import { IDeckSource, IDeckModel } from '@data/interfaces';
import { TDeck } from '@src/domains/interfaces_types';

export class DeckDataSource implements IDeckSource {
  constructor(private deckModel: IDeckModel) {}
  update(deckId: string, data: TDeck) {
    return this.deckModel.update(deckId, data);
  }

  create(deck: TDeck) {
    return this.deckModel.create(deck);
  }

  get(deckId: string) {
    return this.deckModel.get(deckId);
  }
}
