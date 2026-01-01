import { Storage } from '../ports/storage.js';

export class GetKeyQuery {
  constructor(private readonly storage: Storage) {}

  async execute(key: string, now = Date.now()): Promise<unknown | null> {
    const kv = await this.storage.get(key);

    if (!kv) return null;

    if (kv.isExpired(now)) {
      await this.storage.delete(key);
      return null;
    }

    return kv.getValue();
  }
}
