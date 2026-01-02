import { Storage } from '../ports/storage.js';

export class GetKeyQuery {
  constructor(private readonly storage: Storage) {}

  async execute(key: string): Promise<Uint8Array | null> {
    const kv = await this.storage.get(key);

    return kv ? kv.getValue() : null;
  }
}
