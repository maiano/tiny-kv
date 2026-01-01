import { storageContract } from '../../application/ports/storage.contract.js';
import { InMemoryStorage } from './inMemoryStorage.js';

storageContract(() => new InMemoryStorage());
