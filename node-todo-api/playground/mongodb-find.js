// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,db) => {
  if (err) {
    return console.log('unable to connect to db server');
  }
  console.log('connected to db');

  // get array of all docs that are false
  //db.collection('Todos').find({completed: false}).toArray().then((docs) => {

  // // get a particular document by id
  // db.collection('Todos').find({
  //   _id: new ObjectID("5a01e06a995f422f5cac4003")
  // }).toArray().then((docs) => {
  //   console.log('todos');
  //   console.log(JSON.stringify(docs,undefined,2));
  // }, (err) => {
  //   console.log('unable to fetch todos', err);
  // });

  // get a particular document by id
  // db.collection('Todos').find().count().then((count) => {
  //   console.log('todos');
  //   console.log(`todos count: ${count}`);
  // }, (err) => {
  //   console.log('unable to fetch todos', err);
  // });

  // get count of docs where name is 'somedude'
  db.collection('Users').find({
    name: 'somedude'
  }).count().then((count) => {
    console.log('todos');
    console.log(`todos count: ${count}`);
  }, (err) => {
    console.log('unable to fetch todos', err);
  });


  db.close();
});
