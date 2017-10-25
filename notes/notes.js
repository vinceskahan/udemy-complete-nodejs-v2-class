console.log('starting notes.js');

// module.exports.addNote = () => {
//   console.log('addNote');
//   return 'New note';
// };

const fs = require('fs');

var addNote = (title,body) => {
  var notes = [];
  var note = {
    title,
    body,
  }

  // handle no file, or corrupted file
  try {
    var notesString = fs.readFileSync('notes-data.json');
      notes = JSON.parse(notesString);
  } catch (e) {
  }

  // flag this as a dup if title matches a previous note
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    // append to the file, creating it if needed
    notes.push(note);
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
  }
}; // else do nothing

var getAll = () => {
  console.log('Getting all notes');
}

var getNote = (title) => {
  console.log('Getting note: ', title);
}

var removeNote = (title) => {
  console.log('Removing note: ', title);
}

// the "getNote: getNote" syntax is pre-node v6, but still valid
module.exports = {
  addNote,
  getAll,
  getNote: getNote,
  removeNote,
};
