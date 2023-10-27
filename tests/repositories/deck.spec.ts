import { expect } from 'chai';
import sinon from 'sinon';
import { TDeck, IDeckRepository } from '@domains/interfaces_types';
import { DeckRepository } from '@domains/repositories';
import { Deck } from '@entities/index';
import decks from '../mocks/deck_mocks.json';

describe('DeckRepository', () => {
  let deckRepository: IDeckRepository;
  const deck = new Deck(decks[1] as TDeck);

  const deckSourceStub = {
    create: sinon.stub(),
    get: sinon.stub(),
    update: sinon.stub()
  };

  beforeEach(() => {
    deckRepository = new DeckRepository(deckSourceStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new deck', async () => {
    const result = await deckRepository.createNewDeck();

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(deckSourceStub.create.calledOnce).to.be.true;
    expect(result).to.have.property('deckId');
    expect(result).to.have.property('cards');
  });

  it('should find a deck by ID', async () => {
    deckSourceStub.get.resolves(deck);
    const result = await deckRepository.findDeck(deck.deckId);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(deckSourceStub.get.calledWith(deck.deckId)).to.be.true;
    expect(result).to.be.an.instanceOf(Deck);
  });

  it('should update a deck', async () => {
    deckSourceStub.update.resolves(deck.toJSON());

    const result = await deckRepository.updateDeck(deck.deckId, deck);

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    expect(deckSourceStub.update.calledWith(deck.deckId, deck.toJSON())).to.be.true;
    expect(result?.deckId).to.deep.equal(deck.deckId);
  });
});
