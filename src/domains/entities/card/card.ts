import { FACE, SUIT, ICard, HAND, TCard } from '@src/domains/interfaces_types/models';

export class Card implements ICard {
  private _hand?: HAND;
  private _face: FACE;
  private _suit: SUIT;

  constructor(card: TCard);
  constructor(face: FACE, suit: SUIT);
  constructor(cardOrFace: TCard | FACE, suit?: SUIT) {
    this._face = (cardOrFace as TCard).face ?? cardOrFace;
    this._suit = (cardOrFace as TCard).suit ?? suit;
    this._hand = (cardOrFace as TCard).hand ?? undefined;
  }

  getValue() {
    if (this._face <= FACE.TEN) {
      return [this._face + 2];
    }
    if (this._face !== FACE.ACE) {
      return [10];
    }

    return [11, 1];
  }

  get face() {
    return this._face;
  }
  get suit() {
    return this._suit;
  }
  get hand() {
    return this._hand;
  }

  pick(hand: HAND) {
    this._hand = hand;
  }

  toJSON = () => ({ face: this._face, suit: this._suit, hand: this._hand });
}
