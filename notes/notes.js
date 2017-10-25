console.log('starting notes.js');

// module.exports.addNote = () => {
//   console.log('addNote');
//   return 'New note';
// };

var addNote = (title,body) => {
  console.log('Adding note', title, body);
};

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
