import { SUIT, FACE, IDeck, ICard, HAND, TDeck } from '@src/domains/interfaces_types/models';
import { Card } from '@entities/card';
import crypto from 'crypto';

export class Deck implements IDeck {
  private _cards: ICard[] = [];

  private _deckId: string;

  constructor();
  constructor(deck: TDeck);
  constructor(deck?: TDeck) {
    if (deck) {
      this._deckId = deck.deckId;
      this._cards = deck.cards.map((card) => new Card(card));
    } else {
      this._deckId = crypto.randomBytes(16).toString('hex');
      const faces = Object.values(FACE).filter((el) => !Number.isNaN(Number(el)));
      const suits = Object.keys(SUIT).filter((el) => !Number.isNaN(Number(el)));

      faces.forEach((face) => {
        suits.forEach((suit) => {
          this._cards.push(new Card(+face, +suit));
        });
      });
    }
  }

  shuffle() {
    for (let i = this._cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = this._cards[i];
      this._cards[i] = this._cards[j];
      this._cards[j] = temp;
    }
  }

  getNextCard(hand: HAND) {
    const card = this._cards.find((el) => !el.hand)!;
    card.pick(hand);

    return card;
  }

  calculatePoints(hand: HAND) {
    const cards = this._cards.filter((card) => card.hand === hand);

    return cards.reduce((points, card) => {
      const value = card.getValue();
      if (points >= 21 && card.face === FACE.ACE) {
        return points + value[1];
      }
      return points + value[0];
    }, 0);
  }

  get cards() {
    return this._cards;
  }

  get deckId() {
    return this._deckId;
  }

  toJSON() {
    return {
      deckId: this._deckId,
      cards: this._cards.map((card) => card.toJSON())
    };
  }
}
