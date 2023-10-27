import { IDeckRepository, HAND, IEndGame } from '@src/domains/interfaces_types';
import { NotFound, BadRequest } from 'http-errors';

export class EndGameUseCase implements IEndGame {
  constructor(private deckRepository: IDeckRepository) {}

  async exec(deckId: string) {
    const deck = await this.deckRepository.findDeck(deckId);
    if (!deck) throw NotFound(`Deck ${deckId} not found`);
    const playerPoints = deck?.calculatePoints(HAND.PLAYER);
    const dealerPoints = deck?.calculatePoints(HAND.DEALER);

    if (dealerPoints < 17) {
      throw new BadRequest('Dealer should reach at least 17 points');
    }

    return { [HAND.PLAYER]: playerPoints, [HAND.DEALER]: dealerPoints };
  }
}
