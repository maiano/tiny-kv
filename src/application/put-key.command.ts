import { KeyValue } from '../domain/entities/key-value.js';
import { Storage } from '../domain/storage.js';
import { ValidationError } from '../transport/http/error-handler.js';

export class PutKeyCommand {
  constructor(private readonly storage: Storage) {}

  async execute(key: string, value: unknown, ttl?: number): Promise<void> {
    if (!key || key.trim().length === 0) {
      throw new ValidationError('Key cannot be empty');
    }

    if (key.length > 256) {
      throw new ValidationError('Key length exceeds maximum of 256 characters');
    }

    if (value === undefined || value === null) {
      throw new ValidationError('Value is required');
    }

    const kv = KeyValue.create(key, value, ttl);

    await this.storage.put(kv);
  }
}
