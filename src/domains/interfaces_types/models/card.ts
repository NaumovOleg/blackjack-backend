export enum SUIT {
  HEARTS,
  DIAMONDS,
  CLUBS,
  SPADES
}

export enum FACE {
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  TEN,
  JACK,
  QUEEN,
  KING,
  ACE
}

export type TCard = {
  face: FACE;
  suit: SUIT;
  hand?: HAND;
};

export interface ICard {
  face: FACE;
  suit: SUIT;
  hand?: HAND;
  pick(hand: HAND): void;
  toJSON(): TCard;
  getValue(): number[];
}

export enum HAND {
  DEALER = 'DEALER',
  PLAYER = 'PLAYER'
}
