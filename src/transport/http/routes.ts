import { FastifyInstance } from 'fastify';
import { KVHandlers } from './handlers.js';
import {
  deleteKeySchema,
  getKeySchema,
  putKeySchema,
} from './schemas/schemas.js';

export async function registerRoutes(
  fastify: FastifyInstance,
  handlers: KVHandlers,
): Promise<void> {
  fastify.get('/v1/key/:key', {
    schema: getKeySchema,
    handler: handlers.get,
  });
  fastify.put('/v1/key/:key', {
    schema: putKeySchema,
    handler: handlers.put,
  });
  fastify.delete('/v1/key/:key', {
    schema: deleteKeySchema,
    handler: handlers.delete,
  });
  fastify.get('/health', async () => {
    return { status: 'ok' };
  });
}
