## Installation

```bash
$ yarn install
```

___

## Running inside docker

```bash
# local environment
$ docker-compose --env-file ./configs/local.env up --build

# beta environment
$ docker-compose --env-file ./configs/beta.env up --detach

# production environment
$ docker-compose --env-file ./configs/prod.env up --detach
```
___

##  Running for deploy

```bash
# beta environment
$ docker-compose --env-file ./configs/beta.env build api postgres
$ docker-compose --env-file ./configs/beta.env up --no-deps -d api postgres

# production environment
$ docker-compose --env-file ./configs/prod.env build api postgres
$ docker-compose --env-file ./configs/prod.env up --no-deps -d api postgres
```

___

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

___

## Contacts

Author - Fedenko Maksym
- Linkedin - [https://www.linkedin.com](https://www.linkedin.com/in/maksym-fedenko-22a5781b9/)
- GitHub - [https://github.com](https://github.com/feden2906)

___
