import { Router } from 'express';
import { ICard, HAND } from '@domains/interfaces_types';
import { resToJson } from '@utils';
import { pickCardUseCase } from '@domains/index';

export const pickCard = resToJson<ICard, any, any, { deckId: string; hand: HAND }, any>(({ query }) =>
  pickCardUseCase.exec(query.deckId, query.hand)
);

const startGameRouter = Router().get('/', pickCard);
const cardRouter = Router().use('/v1/card', startGameRouter);

export { cardRouter };
