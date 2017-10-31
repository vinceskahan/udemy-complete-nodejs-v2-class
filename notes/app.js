//console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {
    describe: 'title of the note',
    demand: true,
    alias: 't',
}

const bodyOptions = {
    describe: 'body of the note',
    demand: true,
    alias: 'b',
}


const argv = yargs
  .command('add','add a note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('list','list all notes')
  .command('read','read a note', {
      title: titleOptions,
  })
  .command('remove','remove a note', {
      title: titleOptions,
  })
  .help()
  .argv;

var command = argv._[0];

// console.log('command: ', command);
// console.log('Yargs',argv);

if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('note added');
    notes.logNote(note);
  } else {
    console.log('note not added');
  }
} else if (command === 'list') {
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`)
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
  var note = notes.getNote(argv.title);
  console.log(note);
  if (note) {
    console.log('note found');
    notes.logNote(note);
  } else {
    console.log('note not found');
  }
} else if (command === 'remove') {
  var noteRemoved = notes.removeNote(argv.title);
  // yeccch - ternary operator
  var message = noteRemoved ? "note removed" : "note not found" ;
  console.log(message);
} else {
  console.log('command not recognized');
}
