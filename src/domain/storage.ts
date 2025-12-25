import { KeyValue } from './entities/key-value.js';

export interface Storage {
  put(kv: KeyValue): Promise<void>;
  get(key: string): Promise<KeyValue | null>;
  delete(key: string): Promise<boolean>;
  exists(key: string): Promise<boolean>;
  size(): Promise<number>;
}
