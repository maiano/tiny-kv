import { Storage } from '../../domain/storage.js';

export class InMemoryStorage<V> implements Storage<V> {
  private store = new Map<string, V>();

  async put(key: string, value: V): Promise<void> {
    this.store.set(key, value);
  }
  async get(key: string): Promise<V | null> {
    return this.store.get(key) ?? null;
  }
  async delete(key: string): Promise<void> {
    this.store.delete(key);
  }
}
