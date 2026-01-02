import { Storage } from '../../application/ports/storage.js';
import { KeyValue } from '../../domain/entities/key-value.js';

export class InMemoryStorage implements Storage {
  private store = new Map<string, KeyValue>();

  async put(kv: KeyValue): Promise<void> {
    this.store.set(kv.getKey(), kv);
  }
  async get(key: string): Promise<KeyValue | null> {
    const kv = this.store.get(key);
    if (!kv) return null;

    if (kv.isExpired(Date.now())) {
      this.store.delete(key);
      return null;
    }

    return kv;
  }
  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
  async size(): Promise<number> {
    return this.store.size;
  }
}
