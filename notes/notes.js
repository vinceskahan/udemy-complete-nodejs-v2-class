console.log('starting notes.js');

// module.exports.addNote = () => {
//   console.log('addNote');
//   return 'New note';
// };

const fs = require('fs');

// returns an array of notes or an empty note
var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
      return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title,body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body,
  };
  var duplicateNotes = notes.filter((note) => note.title === title);

  if (duplicateNotes.length === 0) {
    // append to the file, creating it if needed
    notes.push(note);
    saveNotes(notes);
    return note;
  }
}; // else do nothing

var getAll = () => {
  console.log('Getting all notes');
}

// return the first match (there will be only one) in an array
var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  return filteredNotes[0];
}

var removeNote = (title) => {
  var notes = fetchNotes();
  // save the notes that don't match the one being removed
  var filteredNotes = notes.filter((note) => note.title !== title);
  saveNotes(filteredNotes);

  // true means we removed something
  return notes.length !== filteredNotes.length;
}

// the "getNote: getNote" syntax is pre-node v6, but still valid
module.exports = {
  addNote,
  getAll,
  getNote: getNote,
  removeNote,
};
