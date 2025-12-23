import { Storage } from '../domain/storage.js';

export class GetKeyQuery {
  constructor(private readonly storage: Storage) {}

  async execute(key: string): Promise<string | null> {
    return await this.storage.get(key);
  }
}
