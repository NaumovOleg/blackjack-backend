import { IDeckRepository } from '@src/domains/interfaces_types/repositories';
import { IDeckSource } from '@src/data/interfaces';
import { Deck } from '@domains/entities';
import { IDeck } from '../interfaces_types';

export class DeckRepository implements IDeckRepository {
  constructor(private deckSource: IDeckSource) {}

  async createNewDeck() {
    const deck = new Deck();
    deck.shuffle();
    await this.deckSource.create(deck.toJSON());
    return deck;
  }

  async findDeck(deckId: string) {
    const deckData = await await this.deckSource.get(deckId);
    return deckData ? new Deck(deckData) : undefined;
  }

  async updateDeck(deckId: string, data: IDeck) {
    const updatedDeck = await this.deckSource.update(deckId, data.toJSON());
    return updatedDeck ? new Deck(updatedDeck) : undefined;
  }
}
