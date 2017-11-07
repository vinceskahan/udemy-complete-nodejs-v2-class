// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if (err) {
    return console.log('unable to connect to db server');
  }
  console.log('connected to db');

  // //findOneAndUpdate(filter,update,options,callback)
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID("5a01ffe1238f8fe5601b0d63")
  // }, {
  //   $set: { completed: true }
  // }, {
  //   returnOriginal: false
  // }).then((results) => {
  //     console.log(JSON.stringify(results,undefined,2));
  // });

  // challenge, update name and increment age
  // https://docs.mongodb.com/manual/reference/operator/update
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("5a020492238f8fe5601b0e08")
  }, {
    $set: { name: "updatedname" },
    $inc: { age: 1 }
  }, {
    returnOriginal: false
  }).then((results) => {
      console.log(JSON.stringify(results,undefined,2));
  });


  db.close();
});
