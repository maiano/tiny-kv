# tiny-kv

**tiny-kv** is a small educational distributed key-value store written in TypeScript.  
The project focuses on **clean architecture**, **idempotent operations**.

---

## Features

- HTTP API for key-value operations
- JSON value storage
- TTL (time-to-live) support
- Idempotent commands
- Clean Architecture–based design
- Contract tests for storage adapters

---

## Architecture

The project follows **Clean Architecture** principles:

### Layers

- **Domain**  
  Core entities and invariants.

- **Application**  
  Use cases and ports. Independent of frameworks and transport.

- **Infrastructure**  
  HTTP server (Fastify) and concrete storage implementations.

## Storage Contract

`Storage` represents a behavioral contract.

Guarantees:

- `get(key)` returns `null` if the key does not exist or the value has expired
- TTL handling is a responsibility of the storage implementation
- Operations are idempotent

## HTTP API

### PUT `/v1/key/:key`

Creates or overwrites a value.

{
  "value": { "foo": "bar" },
  "ttl": 60
}

Response: 201 Created

### GET `/v1/key/:key`

Returns the value for the given key.

{
  "status": "ok",
  "key": "example",
  "value": { "foo": "bar" }
}

Returns 404 if the key does not exist or has expired.

### DELETE `/v1/key/:key`

Response: 204 No Content

### GET `/health`

Health check endpoint.

## Quick Start

> [!NOTE]
> To get started with the development:
>
> 1. Clone the repository.
> 2. Install dependencies using `npm install`.
> 3. Run the development server using `npm run dev`.
> 4. Build the project using `npm run build`.

<details>
  <summary>Scripts</summary>

- `build`: Create production build.

- `dev`: Start development server.

- `format`: Format code with Prettier.

- `lint`: Check for linting errors.

- `test`: Run all tests.

</details>

## Project Status

The project is under development.
