import Fastify, { FastifyInstance } from 'fastify';
import { setupErrorHandler } from './error-handler.js';
import { KVHandlers } from './handlers.js';
import { registerRoutes } from './routes.js';

export class FastifyServer {
  private fastify: FastifyInstance;

  constructor(
    private readonly port: number,
    private readonly handlers: KVHandlers,
  ) {
    this.fastify = Fastify({
      logger: {
        level: process.env.LOG_LEVEL || 'info',
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
          },
        },
      },
      bodyLimit: 1048576,
    });

    setupErrorHandler(this.fastify);

    this.setupRoutes();
  }

  private setupRoutes(): void {
    registerRoutes(this.fastify, this.handlers);
  }

  async start(): Promise<void> {
    try {
      await this.fastify.listen({ port: this.port, host: '127.0.0.1' });
    } catch (err) {
      this.fastify.log.error(err);
      process.exit(1);
    }
  }

  async stop(): Promise<void> {
    await this.fastify.close();
  }
}
