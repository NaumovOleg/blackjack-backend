import { expect } from 'chai';
import sinon from 'sinon';
import { EndGameUseCase, StartGameUseCase, PickCardUseCase } from '@domains/use-cases'; // Replace with the correct path
import { HAND, IPickCard, IStartGame, IEndGame } from '@domains/interfaces_types';
import { NotFound, BadRequest } from 'http-errors';

import decks from '../mocks/deck_mocks.json';

describe('Use cases', () => {
  const deck = {
    deckId: decks[5].deckId,
    cards: decks[5].cards,
    calculatePoints: sinon.stub(),
    getNextCard: sinon.stub()
  };

  let endGameUseCase: IEndGame;
  let startGameUseCase: IStartGame;
  let pickCardUseCase: IPickCard;
  const deckRepositoryStub = {
    findDeck: sinon.stub(),
    createNewDeck: sinon.stub(),
    updateDeck: sinon.stub()
  };

  beforeEach(() => {
    endGameUseCase = new EndGameUseCase(deckRepositoryStub);
    startGameUseCase = new StartGameUseCase(deckRepositoryStub);
    pickCardUseCase = new PickCardUseCase(deckRepositoryStub);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('End game use case ', () => {
    it('should handle the end of the game when dealer points are less than 17', async () => {
      deckRepositoryStub.findDeck.resolves(deck);
      deck.calculatePoints.withArgs(HAND.DEALER).returns(16);

      try {
        await endGameUseCase.exec(deck.deckId);
      } catch (error: any) {
        expect(error).to.be.an.instanceOf(BadRequest);
        expect(error.message).to.equal('Dealer should reach at least 17 points');
      }
    });
    it('should handle the end of the game when dealer points are greater than or equal to 17', async () => {
      // Stub the findDeck method of deckRepository to return the deck
      deckRepositoryStub.findDeck.resolves(deck);

      deck.calculatePoints.withArgs(HAND.PLAYER).returns(18);
      deck.calculatePoints.withArgs(HAND.DEALER).returns(17);

      const result = await endGameUseCase.exec(deck.deckId);

      expect(result).to.deep.equal({ [HAND.PLAYER]: 18, [HAND.DEALER]: 17 });
    });
    it('should handle the case when the deck is not found', async () => {
      deckRepositoryStub.findDeck.resolves(undefined);

      try {
        await endGameUseCase.exec('deck123');
      } catch (error: any) {
        expect(error).to.be.an.instanceOf(NotFound);
        expect(error.message).to.equal('Deck deck123 not found');
      }
    });
  });

  describe('Start game use case', () => {
    it('should start a new game', async () => {
      const card1 = { ...deck.cards[0], hand: HAND.DEALER };
      const card2 = { ...deck.cards[1], hand: HAND.PLAYER };
      const card3 = { ...deck.cards[2], hand: HAND.DEALER };
      const card4 = { ...deck.cards[3], hand: HAND.PLAYER };

      deckRepositoryStub.createNewDeck.resolves(deck);

      deck.getNextCard.withArgs(HAND.DEALER).onFirstCall().returns(card1);
      deck.getNextCard.withArgs(HAND.PLAYER).onFirstCall().returns(card2);
      deck.getNextCard.withArgs(HAND.DEALER).onSecondCall().returns(card3);
      deck.getNextCard.withArgs(HAND.PLAYER).onSecondCall().returns(card4);

      deckRepositoryStub.updateDeck.resolves();
      const result = await startGameUseCase.exec();

      expect(deckRepositoryStub.createNewDeck.calledOnce).to.be.true;
      expect(deck.getNextCard.calledWith(HAND.DEALER)).to.be.true;
      expect(deck.getNextCard.calledWith(HAND.PLAYER)).to.be.true;
      expect(deckRepositoryStub.updateDeck.calledWith(deck.deckId, deck)).to.be.true;
      expect(result).to.deep.equal({
        deckId: deck.deckId,
        cards: [card1, card2, card3, card4]
      });
    });
  });

  describe('Pick card', () => {
    it('should pick a card for a player', async () => {
      deckRepositoryStub.findDeck.resolves(deck);

      // Stub the calculatePoints method of the deck to return points less than 21
      deck.calculatePoints.withArgs(HAND.DEALER).returns(15);
      deck.calculatePoints.withArgs(HAND.PLAYER).returns(18);

      const card = deck.cards[0];
      deck.getNextCard.withArgs(HAND.PLAYER).returns(card);
      deckRepositoryStub.updateDeck.resolves();

      const result = await pickCardUseCase.exec(deck.deckId, HAND.PLAYER);

      expect(deckRepositoryStub.findDeck.calledWith(deck.deckId)).to.be.true;
      expect(deck.calculatePoints.calledWith(HAND.PLAYER)).to.be.true;
      expect(deck.getNextCard.calledWith(HAND.PLAYER)).to.be.true;
      expect(deckRepositoryStub.updateDeck.calledWith(deck.deckId, deck)).to.be.true;
      expect(result).to.deep.equal([card]);
    });
  });
});
