import { InMemoryStorage } from './infrastructure/storage/inMemoryStorage.js';
import { GetKeyQuery } from './application/use-cases/get-key.query.js';
import { PutKeyCommand } from './application/use-cases/put-key.command.js';
import { DeleteKeyCommand } from './application/use-cases/delete-key.command.js';
import { KVHandlers } from './transport/http/handlers.js';
import { FastifyServer } from './transport/http/server.js';

async function bootstrap() {
  const port = parseInt(process.env.PORT || '3000', 10);

  // Infrastructure
  const storage = new InMemoryStorage();

  // Application
  const getKeyQuery = new GetKeyQuery(storage);
  const putKeyCommand = new PutKeyCommand(storage);
  const deleteKeyCommand = new DeleteKeyCommand(storage);

  // Transport
  const handlers = new KVHandlers(getKeyQuery, putKeyCommand, deleteKeyCommand);

  // Server
  const server = new FastifyServer(port, handlers);
  await server.start();

  // Graceful shutdown
  process.on('SIGTERM', async () => {
    console.log('Shutting down...');
    await server.stop();
    process.exit(0);
  });
}

bootstrap().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
