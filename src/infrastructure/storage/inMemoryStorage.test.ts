import { InMemoryStorage } from './inMemoryStorage.js';
import { storageContract } from '../../domain/storage.contract.js';

storageContract(() => new InMemoryStorage());
