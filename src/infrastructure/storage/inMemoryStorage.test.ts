import { InMemoryStorage } from './inMemoryStorage.js';
import { storageContract } from '../../application/ports/storage.contract.js';

storageContract(() => new InMemoryStorage());
