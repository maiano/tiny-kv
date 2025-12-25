import { KeyValue } from '../../domain/entities/key-value.js';
import { Storage } from '../../application/ports/storage.js';

export class InMemoryStorage implements Storage {
  private store = new Map<string, KeyValue>();

  async put(kv: KeyValue): Promise<void> {
    this.store.set(kv.getKey(), kv);
  }
  async get(key: string): Promise<KeyValue | null> {
    return this.store.get(key) ?? null;
  }
  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
  async size(): Promise<number> {
    return this.store.size;
  }
}
