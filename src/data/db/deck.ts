import { IDeckModel } from '@data/interfaces';
import { TDeck } from '@domains/interfaces_types';
import { appendFile, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export class DeckModel implements IDeckModel {
  private dbFile = join(__dirname, './database.txt');

  getLines() {
    return readFile(this.dbFile).then((buff) =>
      buff
        .toString()
        .split('\n')
        .filter((line) => line !== '\n' && line !== '')
    );
  }

  async update(deckId: string, deckData: TDeck) {
    const lines = await this.getLines();
    const index = lines.findIndex((line) => JSON.parse(line).deckId === deckId);

    if (index < 0) return null;
    lines[index] = JSON.stringify(deckData);

    await writeFile(
      this.dbFile,
      lines.map((line) => `${line}\n`)
    );
    return deckData;
  }

  async get(deckId: string) {
    const lines = await this.getLines();
    const found = lines.find((el) => el.includes(deckId));

    return found && JSON.parse(found);
  }

  async create(data: TDeck) {
    await appendFile(this.dbFile, `${JSON.stringify(data)}\n`);

    return Promise.resolve(data);
  }
}
