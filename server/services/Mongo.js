var MongoClient = require('mongodb').MongoClient;

const dbName = 'myFlixDB';

exports.find = (collection, where, projection) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                console.log(err);

                reject(err);
            }
    
            let dbo = client.db(dbName);
    
            let projectionFound = dbo.collection(collection).find(where).project(projection);
    
            projectionFound.toArray().then(results => {
                resolve(results);
            }).catch(err => {
                reject(err);
            }).finally(() => {
                client.close();
            });
        });
    });
}

exports.insert = (collection, object) => {
    return new Promise((resolve, reject) => {
        MongoClient.connect(process.env.MONGO_URL, { useUnifiedTopology: true }, (err, client) => {
            if (err) {
                console.log(err);

                reject(err);
            }
    
            let dbo = client.db(dbName);
    
            dbo.collection(collection).insertOne(object).then(result => {
                resolve(result);
            }).catch(err => {
                reject(err);
            }).finally(() => {
                client.close();
            })
        });
    });
}
