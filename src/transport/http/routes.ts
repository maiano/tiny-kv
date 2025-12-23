import { FastifyInstance } from 'fastify';
import { KVHandlers } from './handlers.js';

export async function registerRoutes(
  fastify: FastifyInstance,
  handlers: KVHandlers,
): Promise<void> {
  fastify.get('/v1/key/:key', handlers.get);
  fastify.put('/v1/key/:key', handlers.put);
  fastify.delete('/v1/key/:key', handlers.delete);
}
