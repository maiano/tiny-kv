/**
 * Storage contract tests.
 */

import type { Storage } from './storage.js';

export function storageContract(factory: () => Storage) {
  describe('Storage contract', () => {
    let storage: Storage;

    beforeEach(() => {
      storage = factory();
    });

    test('put and get', async () => {
      await storage.put('a', '1');
      expect(await storage.get('a')).toBe('1');
    });

    test('get returns null for missing key', async () => {
      expect(await storage.get('missing')).toBeNull();
    });

    test('delete removes value', async () => {
      await storage.put('b', '2');
      await storage.delete('b');
      expect(await storage.get('b')).toBeNull();
    });
  });
}
