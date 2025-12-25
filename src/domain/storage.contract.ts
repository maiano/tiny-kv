/**
 * Storage contract tests.
 */

import { KeyValue } from './entities/key-value.js';
import type { Storage } from './storage.js';

export function storageContract(factory: () => Storage) {
  describe('Storage contract', () => {
    let storage: Storage;

    beforeEach(() => {
      storage = factory();
    });

    test('put and get', async () => {
      const data = KeyValue.create('a', '1');
      await storage.put(data);
      const value = await storage.get('a');
      expect(value?.getValue()).toBe('1');
    });

    test('get returns null for missing key', async () => {
      expect(await storage.get('missing')).toBeNull();
    });

    test('delete removes value', async () => {
      const data = KeyValue.create('b', '2');
      await storage.put(data);
      await storage.delete('b');
      expect(await storage.get('b')).toBeNull();
    });
  });
}
