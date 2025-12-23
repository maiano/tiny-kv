export interface Storage {
  put(key: string, value: string): Promise<void>;
  get(key: string): Promise<string | null>;
  delete(key: string): Promise<boolean>;
  exists(key: string): Promise<boolean>;
  size(): Promise<number>;
}
