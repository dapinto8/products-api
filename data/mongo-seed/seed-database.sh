mongoimport --username root --password root --uri mongodb://root:root@localhost:27017/promotions?authSource=admin --collection products --mode upsert --type json --file ./data/mongo-seed/products.json --jsonArray