import { Storage } from '../domain/storage.js';

export class PutKeyCommand {
  constructor(private readonly storage: Storage) {}

  async execute(key: string, value: string): Promise<void> {
    if (!key || key.trim().length === 0) {
      throw new Error('key cannot be empty');
    }

    await this.storage.put(key, value);
  }
}
