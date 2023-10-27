import { IStartGame, IDeckRepository, HAND } from '@src/domains/interfaces_types';

export class StartGameUseCase implements IStartGame {
  constructor(private deckRepository: IDeckRepository) {}

  async exec() {
    const deck = await this.deckRepository.createNewDeck();

    const cards = [
      deck.getNextCard(HAND.DEALER)!,
      deck.getNextCard(HAND.PLAYER)!,
      deck.getNextCard(HAND.DEALER)!,
      deck.getNextCard(HAND.PLAYER)!
    ];

    await this.deckRepository.updateDeck(deck.deckId, deck);

    return { deckId: deck.deckId, cards };
  }
}
