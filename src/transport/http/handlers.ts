import { FastifyRequest, FastifyReply } from 'fastify';
import { GetKeyQuery } from '../../application/get-key.query.js';
import { PutKeyCommand } from '../../application/put-key.command.js';
import { DeleteKeyCommand } from '../../application/delete-key.command.js';
import { KeyNotFoundError } from './error-handler.js';

type KeyParams = {
  key: string;
};

type PutKeyBody = {
  value: unknown;
  ttl?: number;
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
    const { key } = req.params;
    const value = await this.getKeyQuery.execute(key);

    if (value === null) {
      throw new KeyNotFoundError(key);
    }

    reply.status(200).send({
      status: 'ok',
      key,
      value,
    });
  };

  put = async (
    req: FastifyRequest<{ Params: KeyParams; Body: PutKeyBody }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const { key } = req.params;
    const { value, ttl } = req.body;

    await this.putKeyCommand.execute(key, value, ttl);

    reply.status(201).send({
      status: 'created',
      key,
      value,
    });
  };

  delete = async (
    req: FastifyRequest<{ Params: KeyParams }>,
    reply: FastifyReply,
  ): Promise<void> => {
    const { key } = req.params;
    const deleted = await this.deleteKeyCommand.execute(key);

    if (!deleted) {
      throw new KeyNotFoundError(key);
    }

    reply.status(200).send({
      status: 'deleted',
      key,
    });
  };
}
