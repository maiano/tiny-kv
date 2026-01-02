import { KeyValue } from '../../domain/entities/key-value.js';
import { InvalidKeyError, InvalidTTL } from '../errors/errors.js';
import { Storage } from '../ports/storage.js';

export class PutKeyCommand {
  constructor(private readonly storage: Storage) {}

  async execute(key: string, value: Uint8Array, ttl?: number): Promise<void> {
    if (!key || key.trim().length === 0) {
      throw new InvalidKeyError('Key cannot be empty');
    }

    if (key.length > 256) {
      throw new InvalidKeyError('Key length exceeds maximum of 256 characters');
    }

    if (value === undefined || value === null) {
      throw new InvalidKeyError('Value is required');
    }

    if (ttl !== undefined && ttl <= 0) {
      throw new InvalidTTL('TTL must be positive');
    }

    const kv = KeyValue.create(key, value, ttl);

    await this.storage.put(kv);
  }
}
