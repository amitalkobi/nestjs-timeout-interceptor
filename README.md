# NestJS Timeout Interceptor

When using timeout interceptor (`TimeoutInterceptor` in timeout.interceptor.ts) with EP that returns `StreamableFile`, the interceptor doesn't work.

It does work when returning a list of string.

## How to reproduce

1. Start the app in dev mode
2. Visit http://localhost:3000/foo/file
The foo/file endpoint takes 3 seconds to resolve while the timeout interceptor sets a timeout of 10 ms
### Current behavior
File is downloaded.

### Expected behavior
A response with code 408 should be returned.

Note that the timeout interceptor works when submitting a request to `GET /foo`

---

## NestJS starter readme

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
