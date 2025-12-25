import { KeyValue } from '../../domain/entities/key-value.js';
import { Storage } from '../../domain/storage.js';

export class InMemoryStorage implements Storage {
  private store = new Map<string, KeyValue>();

  async put(kv: KeyValue): Promise<void> {
    this.store.set(kv.getKey(), kv);
  }
  async get(key: string): Promise<KeyValue | null> {
    return this.store.get(key) ?? null;
  }
  async delete(key: string): Promise<boolean> {
    return this.store.delete(key);
  }
  async exists(key: string): Promise<boolean> {
    return this.store.has(key);
  }
  async size(): Promise<number> {
    return this.store.size;
  }
}
