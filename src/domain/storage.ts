export interface Storage<V = unknown> {
  put(key: string, value: V): Promise<void>;
  get(key: string): Promise<V | null>;
  delete(key: string): Promise<void>;
}
