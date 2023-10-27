import { expect } from 'chai';
import sinon from 'sinon';
import { TDeck } from '@domains/interfaces_types';
import { IDeckSource } from '@data/interfaces';
import { DeckDataSource } from '@data/sources';
import decks from '../mocks/deck_mocks.json';

describe('DeckDataSource', () => {
  let deckDataSource: IDeckSource;
  const deckModelStub = {
    update: sinon.stub(),
    create: sinon.stub(),
    get: sinon.stub()
  };

  afterEach(() => {
    sinon.restore();
  });

  beforeEach(() => {
    deckDataSource = new DeckDataSource(deckModelStub);
  });

  const deck = decks[0] as TDeck;

  it('should update a deck', async () => {
    const { deckId } = deck;
    const data = deck.cards;
    deckModelStub.update.resolves(data);
    const result = await deckDataSource.update(deckId, deck);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(deckModelStub.update.calledWith(deckId, deck)).to.be.true;
    expect(result).to.deep.equal(data);
  });

  it('should create a new deck', async () => {
    deckModelStub.create.resolves(deck);
    const result = await deckDataSource.create(deck);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(deckModelStub.create.calledWith(deck)).to.be.true;
    expect(result).to.deep.equal(deck);
  });

  it('should get a deck by ID', async () => {
    deckModelStub.get.resolves(deck);
    const result = await deckDataSource.get(deck.deckId);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(deckModelStub.get.calledWith(deck.deckId)).to.be.true;
    expect(result).to.deep.equal(deck);
  });
});
