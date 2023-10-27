import { DeckDataSource } from '@data/sources';
import { DeckRepository } from '@domains/repositories';
import { StartGameUseCase, PickCardUseCase, EndGameUseCase } from '@domains/use-cases';
import { DeckModel } from '@src/data/db';

/** DATA SOURCES */
const deckDataSource = new DeckDataSource(new DeckModel());

/** REPOSITORIES */
const deckRepository = new DeckRepository(deckDataSource);

/** USE CASES */
export const startGameUseCase = new StartGameUseCase(deckRepository);
export const pickCardUseCase = new PickCardUseCase(deckRepository);
export const endGameUseCase = new EndGameUseCase(deckRepository);
