// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if (err) {
    return console.log('unable to connect to db server');
  }
  console.log('connected to db');

  //deleteMany
  db.collection('Todos').deleteMany({text: "eat"}).then((result) => {
    console.log(result);
  });

  //deleteOne

  //findOneAndDelete

  db.close();
});
