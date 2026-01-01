export class KeyValue {
  constructor(
    private readonly key: string,
    private readonly value: unknown,
    private readonly expiresAt?: number,
  ) {}

  getValue(): unknown {
    return this.value;
  }

  isExpired(now: number): boolean {
    return this.expiresAt !== undefined && now > this.expiresAt;
  }

  getKey(): string {
    return this.key;
  }

  static create(
    key: string,
    value: unknown,
    ttl?: number,
    now: number = Date.now(),
  ): KeyValue {
    const expiresAt = ttl !== undefined ? now + ttl * 1000 : undefined;
    return new KeyValue(key, value, expiresAt);
  }
}
