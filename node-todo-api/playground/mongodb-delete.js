// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if (err) {
    return console.log('unable to connect to db server');
  }
  console.log('connected to db');

  // //deleteMany
  // db.collection('Users').deleteMany({name: "somedude"}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  db.collection('Users').deleteOne({name: 'somedude2'}).then((result) => {
    console.log(JSON.stringify(result,undefined,2));
  });

  // //findOneAndDelete
  // db.collection('Users').findOneAndDelete({
  //   _id: new ObjectID("5a020119238f8fe5601b0d8c")
  // }).then((results) => {
  //   console.log(JSON.stringify(results,undefined,2));
  // });

  db.close();
});
