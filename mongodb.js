const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const connectionURL = 'mongodb://127.0.0.1:27017'
//'demodb' is Mongodb Database
const database = 'demodb'

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }
    const db = client.db(database)


    //Passing the  reference for collection  from mondodb database
    /* Applying InsertOne() method to insert single documents
    we want to insert document for collection(i.e users,task) from the mongodb database 'demodb' */
    db.collection('users').insertOne({
        Username: 'ankita',
        password: '1234@1',
        email: 'ankita23@gmail.com'
    });

    db.collection('task').insertOne({
        description: 'Clean the house',
        completed: 'true'

    });


    //Here passing the reference for collection from database
    /*Applying InsertMany() method to insert multiple documents at once
     that means at a time we want to insert multiple document for collection 'users' */
    db.collection('users').insertMany([
        {
            Username: 'kaushiki',
            password: '1234@1',
            email: 'kaushiki23@gmail.com'
        },
        {
            Username: 'shalini',
            password: 'sha4@1',
            email: 'shalini2345@gmail.com'
        }
    ], (error, result) => {
        if (error) {
            return console.log('unable to insert')
        }
        //console.log(result.ops)

    })


    /* Similarly,
     InsertMany() method to insert multiple documents at once
     that means at a time we want to insert multiple document for collection 'task' */
    db.collection('task').insertMany([
        {
            description: 'Clean the house',
            completed: true
        }, {
            description: 'Renew inspection',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks!')
        }
        console.log(result.ops)
    })

    // const { MongoClient, ObjectID } = require('mongodb')
    // const id = new ObjectId()
    // console.log(id) // Print new id to the console


    // Applying find method to searching for documents in the 'users' collection.
    db.collection('users').find({ Username: 'anjali' }).toArray((error, users) => {
        console.log(users)
    });

    // Applying find method to searching for documents in the 'task' collection.
    db.collection('task').find({ completed: 'true' }).toArray((error, task) => {
        console.log(task)
    });


    //Applying  findOne to find a single document by its ID.
    // db.collection('task').findOne({
    //     _id: new
    //         ObjectID("621e5ebff38bdf3be2056514")
    // }, (error, task) => {
    //     console.log(task)
    // })


    //Applying promises

    const doWorkPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([7, 4, 1])
            // reject('Things went wrong!')
        }, 2000)
    })
    doWorkPromise.then((result) => {
        console.log('Success!', result)
    }).catch((error) => {
        console.log('Error!', error)
    })


    //Applying UpdateOne() method for updating the document 
    // db.collection('users').updateOne({
    //     _id: new ObjectID("621e351a38bb79392fa06346")
    // }, {
    //     $inc: {
    //         Username: 'komal'
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })



    // Another way to update the single document using UpdateOne() method.
    var query = { Username: "anjali" };
    var updatedvalue = { $set: { Username: "komal", email: "komal34@gmail.com" } };
    db.collection("users").updateOne(query, updatedvalue, function (err, result) {
        if (err) throw err;
        console.log(" Successfully Update documrnt");
    });


    //Applying UpdateMany() method for updating multiple  document in 'task' collection.

    db.collection('task').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result.modifiedCount)
    }).catch((error) => {
        console.log(error)
    })


    //Applying DeleteOne() for delecting single document in 'task' collection.
    db.collection('task').deleteOne({
        description: "Clean the house"
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })



    //Applying DeleteMany() for delecting multiple document in 'users' collection.
    db.collection('users').deleteMany({
        Username: 'komal'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })



})






