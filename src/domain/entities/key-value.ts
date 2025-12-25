export class KeyValue {
  constructor(
    private readonly key: string,
    private readonly value: unknown,
    private readonly expiresAt?: Date,
  ) {}

  getValue(): unknown {
    return this.value;
  }

  isExpired(now: Date = new Date()): boolean {
    if (!this.expiresAt) return false;
    return now > this.expiresAt;
  }

  getKey(): string {
    return this.key;
  }

  static create(
    key: string,
    value: unknown,
    ttl?: number,
    now: Date = new Date(),
  ): KeyValue {
    const expiresAt = ttl ? new Date(now.getTime() + ttl * 1000) : undefined;
    return new KeyValue(key, value, expiresAt);
  }
}
