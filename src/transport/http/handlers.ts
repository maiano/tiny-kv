import { FastifyRequest, FastifyReply } from 'fastify';
import { GetKeyQuery } from '../../application/get-key.query.js';
import { PutKeyCommand } from '../../application/put-key.command.js';
import { DeleteKeyCommand } from '../../application/delete-key.command.js';

type KeyParams = {
  key: string;
};

type PutKeyBody = {
  value: string;
};

export class KVHandlers {
  constructor(
    private readonly getKeyQuery: GetKeyQuery,
    private readonly putKeyCommand: PutKeyCommand,
    private readonly deleteKeyCommand: DeleteKeyCommand,
  ) {}

  get = async (
    req: FastifyRequest<{ Params: KeyParams }>,
    reply: FastifyReply,
  ): Promise<void> => {
    try {
      const { key } = req.params;

      const value = await this.getKeyQuery.execute(key);

      if (value === null) {
        reply.status(404).send({
          status: 'not-found',
          key,
        });
        return;
      }

      reply.status(200).send({
        status: 'ok',
        key,
        value,
      });
    } catch (error) {
      req.log.error(error);
      reply.status(500).send({
        status: 'error',
        message: error instanceof Error ? error.message : 'unknown error',
      });
    }
  };

  put = async (
    req: FastifyRequest<{ Params: KeyParams; Body: PutKeyBody }>,
    reply: FastifyReply,
  ): Promise<void> => {
    try {
      const { key } = req.params;
      const { value } = req.body;

      if (value === undefined) {
        reply.status(400).send({
          status: 'error',
          message: 'Value is required',
        });
        return;
      }

      await this.putKeyCommand.execute(key, value);

      reply.status(201).send({
        status: 'created',
        key,
        value,
      });
    } catch (error) {
      req.log.error(error);
      reply.status(500).send({
        status: 'error',
        message: error instanceof Error ? error.message : 'unknown error',
      });
    }
  };

  delete = async (
    req: FastifyRequest<{ Params: KeyParams }>,
    reply: FastifyReply,
  ): Promise<void> => {
    try {
      const { key } = req.params;

      const deleted = await this.deleteKeyCommand.execute(key);

      if (!deleted) {
        reply.status(404).send({
          status: 'not-found',
          key,
        });
        return;
      }

      reply.status(200).send({
        status: 'deleted',
        key,
      });
    } catch (error) {
      req.log.error(error);
      reply.status(500).send({
        status: 'error',
        message: error instanceof Error ? error.message : 'unknown error',
      });
    }
  };
}
