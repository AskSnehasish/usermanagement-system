var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/"; // Replace it with your database connection
var DB = "accenture"; // replace it with your database name

exports.createCollection = function (collectionName, callback) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.createCollection(collectionName, function (err, res) {
            if (err) throw err;
            // console.log("Collection created!");
            callback(true);
            db.close();
        });
    });
};

exports.insertDocument = function (myobj, collectionName, callback) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            callback(true);
            db.close();
        });
    });
};

exports.updateOne = function (mquery, mvalue, collectionName, callback) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        var newvalues = { $set: mvalue };
        // console.log(mquery);
        // console.log(newvalues);
        dbo.collection(collectionName).updateOne(mquery, newvalues, function (err, res) {
            if (err) throw err;
            callback(true);
            // console.log("1 document updated");
            db.close();
        });
    });
};

exports.removeDocument = function (myobj, collectionName, callback) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).remove(myobj, function (err, res) {
            if (err) throw err;
            callback(true);
            db.close();
        });
    });
};

exports.insertManyDocuments = function (myobj, collectionName, callback) {
    // console.log(myobj);
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).insertMany(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            callback(true);
            db.close();
        });
    });
};

exports.findOne = function (collectionName, callback) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).findOne({}, function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};

exports.queryFindAll = function (myobj, collectionName, callback) {
    // console.log(myobj)
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find(myobj).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};

exports.queryFindAllWithSkip = function (myobj,project,sort,skip,limit, collectionName, callback) {
    // console.log(limit);
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find(myobj,project).sort(sort).skip(skip).limit(limit).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};

exports.queryFindAllProjection = function (myobj, project, collectionName, callback) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        console.log(project)
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find(myobj).project(project).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
        });
    });
};

exports.queryFindAllProjectionNameSort = function (myobj, project, collectionName, callback) {
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        // console.log(project)
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).find(myobj, project).sort({name:1}).toArray(function (err, result) {
            if (err) throw err;
            callback(result);
            db.close();
            
        });
    });
};


exports.queryWithAggregator = function (aggregate, collectionName, callback) {
    // // console.log(aggregate);
    MongoClient.connect(url, { useUnifiedTopology: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db(DB);
        dbo.collection(collectionName).aggregate(aggregate).toArray(function (err, result) {
            if (err) throw err;
            // // console.log(result);
            callback(result);
            db.close();
        });
    });
};

