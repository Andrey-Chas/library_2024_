const MongoClient = require('mongodb').MongoClient;

let _db; // Store the database connection globally

async function connectToMongo(uri = 'mongodb://localhost:27017') {
    if (_db) return _db; // Return existing connection if already established

    const client = await MongoClient.connect(uri);

    _db = client.db("library"); // Get the database instance
    console.log('Connected to MongoDB');
    return _db;
}

module.exports = {
    connectToMongo,

    // Define reusable MongoDB operations:
    findDocuments(collectionName, query = {}) {
        return _db.collection(collectionName).find(query).toArray();
    },

    insertDocument(collectionName, document) {
        return _db.collection(collectionName).insertOne(document);
    },

    updateDocument(collectionName, query, update) {
        return _db.collection(collectionName).updateOne(query, update);
    },

    deleteDocument(collectionName, query) {
        return _db.collection(collectionName).deleteOne(query);
    },
};