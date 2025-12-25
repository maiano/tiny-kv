import { KeyValue } from '../../domain/entities/key-value.js';

export interface Storage {
  put(kv: KeyValue): Promise<void>;
  get(key: string): Promise<KeyValue | null>;
  delete(key: string): Promise<void>;
  size(): Promise<number>;
}
