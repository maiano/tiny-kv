import { Storage } from '../domain/storage.js';

export class DeleteKeyCommand {
  constructor(private readonly storage: Storage) {}

  async execute(key: string): Promise<void> {
    await this.storage.delete(key);
  }
}
