export const putKeySchema = {
  params: {
    type: 'object',
    required: ['key'],
    properties: {
      key: {
        type: 'string',
        minLength: 1,
        maxLength: 256,
        pattern: '^[a-zA-Z0-9:_-]+$',
      },
    },
  },
  body: {
    type: 'object',
    required: ['value'],
    properties: {
      value: {
        oneOf: [
          { type: 'string' },
          { type: 'number' },
          { type: 'boolean' },
          { type: 'object' },
          { type: 'array' },
          { type: 'null' },
        ],
      },
      ttl: {
        type: 'integer',
        minimum: 1,
        maximum: 2592000,
      },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        key: { type: 'string' },
        value: {},
      },
    },
    400: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
} as const;

export const getKeySchema = {
  params: {
    type: 'object',
    required: ['key'],
    properties: {
      key: {
        type: 'string',
        minLength: 1,
        maxLength: 256,
      },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        key: { type: 'string' },
        value: {},
      },
    },
    404: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        code: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
} as const;

export const deleteKeySchema = {
  params: {
    type: 'object',
    required: ['key'],
    properties: {
      key: {
        type: 'string',
        minLength: 1,
        maxLength: 256,
      },
    },
  },
  response: {
    204: {
      description: 'Key deleted',
    },
  },
} as const;
