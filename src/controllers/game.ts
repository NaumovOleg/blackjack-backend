import { Router } from 'express';
import { IDeck } from '@domains/interfaces_types';
import { resToJson } from '@utils';
import { startGameUseCase, endGameUseCase } from '@domains/index';

export const startGame = resToJson<IDeck, any, any, any, any>(() => startGameUseCase.exec());
export const endGame = resToJson<IDeck, any, any, { deckId: string }, any>(({ query }) =>
  endGameUseCase.exec(query.deckId)
);

const startGameRouter = Router().get('/start', startGame);
const endGameRouter = Router().get('/end', endGame);

const gameRouter = Router().use('/v1/game', [startGameRouter, endGameRouter]);

export { gameRouter };
