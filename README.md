# Products API

## Getting started

- First make sure you have docker and docker-compose installed and follow the next steps.

- Create a .env file in the root folder (You could copy the .env.example)

#### Install dependencies
```bash
npm install --force
```

#### Build image
```bash
docker-compose build
```
#### Start containers
```bash
docker-compose up -d
```

#### Seed database
```bash
docker-compose exec db bash -c './data/mongo-seed/seed-database.sh'
```

That's all, now you can try making request

## Docs

Install postman if you don't have it and import the file api.postman_collection.json

## Tests

```bash
npm run tests
```