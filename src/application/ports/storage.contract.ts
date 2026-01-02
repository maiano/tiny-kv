/**
 * Storage contract tests.
 */

import { KeyValue } from '../../domain/entities/key-value.js';
import type { Storage } from './storage.js';

const encoded1 = new Uint8Array([49]);
const encoded2 = new Uint8Array([50]);

export function storageContract(factory: () => Storage) {
  describe('Storage contract', () => {
    let storage: Storage;

    beforeEach(() => {
      storage = factory();
    });

    test('put and get', async () => {
      const data = KeyValue.create('a', encoded1);
      await storage.put(data);
      const value = await storage.get('a');
      expect(Array.from(value!.getValue())).toEqual(Array.from(encoded1));
    });

    test('get returns null for missing key', async () => {
      expect(await storage.get('missing')).toBeNull();
    });

    test('delete removes value', async () => {
      const data = KeyValue.create('b', encoded2);
      await storage.put(data);
      await storage.delete('b');
      expect(await storage.get('b')).toBeNull();
    });

    test('put is idempotent', async () => {
      const data = KeyValue.create('a', encoded1);
      await storage.put(data);
      await storage.put(data);
      expect(await storage.get('a')).not.toBeNull();
    });
  });
}
