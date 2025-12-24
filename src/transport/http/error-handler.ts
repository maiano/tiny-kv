import {
  FastifyError,
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from 'fastify';

export class AppError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public code?: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

export class KeyNotFoundError extends AppError {
  constructor(key: string) {
    super(`Key '${key}' not found`, 404, 'KEY_NOT_FOUND');
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, 'VALIDATION_ERROR');
  }
}

export function setupErrorHandler(fastify: FastifyInstance): void {
  fastify.setErrorHandler(
    (
      error: FastifyError | AppError,
      request: FastifyRequest,
      reply: FastifyReply,
    ) => {
      if ('statusCode' in error && error.statusCode >= 500) {
        request.log.error(error, 'Internal server error');
      } else if ('statusCode' in error && error.statusCode >= 400) {
        request.log.warn(error, 'Client error');
      } else {
        request.log.error(error, 'Unexpected error');
      }

      const statusCode = 'statusCode' in error ? error.statusCode : 500;
      const code = 'code' in error ? error.code : 'INTERNAL_ERROR';

      reply.status(statusCode).send({
        status: 'error',
        code,
        message: error.message,
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
      });
    },
  );

  fastify.setNotFoundHandler((request, reply) => {
    reply.status(404).send({
      status: 'error',
      code: 'NOT_FOUND',
      message: `Route ${request.method} ${request.url} not found`,
    });
  });
}
