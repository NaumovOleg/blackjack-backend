import { IDeckRepository, HAND, IPickCard, IDeck, ICard } from '@src/domains/interfaces_types';
import { NotFound, BadRequest } from 'http-errors';

export class PickCardUseCase implements IPickCard {
  constructor(private deckRepository: IDeckRepository) {}

  async exec(deckId: string, hand: HAND) {
    const deck = await this.deckRepository.findDeck(deckId);

    if (!deck) {
      throw new NotFound(`Deck ${deckId} not found`);
    }
    const points = deck.calculatePoints(hand);
    if (points >= 21) {
      throw BadRequest(`${hand} reached 21 points`);
    }

    const cards = hand === HAND.DEALER ? this.pickUntil17Points(deck, []) : [deck.getNextCard(hand)];
    await this.deckRepository.updateDeck(deckId, deck);

    return cards;
  }

  pickUntil17Points(deck: IDeck, cardList: ICard[]): ICard[] {
    const card = deck.getNextCard(HAND.DEALER);

    if (!card) return cardList;

    const points = deck.calculatePoints(HAND.DEALER);
    cardList.push(card);

    if (points >= 17) {
      return cardList;
    }

    return this.pickUntil17Points(deck, cardList);
  }
}
