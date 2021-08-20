const fs = require("fs");
const chalk = require("chalk");
const getNotes = () => {
  return loadNotes();
};
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
const saveNotes = (notes) => {
  fs.writeFileSync("notes.json", JSON.stringify(notes));
};
const addNotes = (title, body) => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter((note) => note.title === title);
  if (duplicateNotes.length > 0) {
    console.log(
      chalk.bgRed.black(
        "Duplicate of note with given title is already present!"
      )
    );
    return;
  }
  notes.push({ title, body });
  saveNotes(notes);
  console.log(chalk.bgGreen.black("Successfully Added!"));
};
const readNote = (title) => {
  const notes = loadNotes();
  const noteToRead = notes.find((note) => note.title === title);
  if (!noteToRead) {
    console.log(chalk.blue.inverse("No Note Found!"));
    return;
  }
  console.log(
    `${chalk.inverse(noteToRead.title)} => Body : ${noteToRead.body}`
  );
};
const removeNote = (title) => {
  const notes = loadNotes();
  const noteToKeep = notes.filter((note) => note.title !== title);
  if (noteToKeep.length === notes.length) {
    console.log(chalk.bgRed.black("Note not find!"));
    return;
  }
  saveNotes(noteToKeep);
  console.log(chalk.bgGreen.black("Successfully Removed!!"));
};
const listNotes = () => {
  const allNotes = getNotes();
  if (allNotes.length === 0) {
    console.log(chalk.cyan.inverse("No Notes!"));
    return;
  }
  console.log(chalk.blue.inverse("Your Notes : "));
  allNotes.forEach((note) => {
    console.log(`${chalk.inverse(note.title)} => Body : ${note.body}`);
  });
};
module.exports = {
  getNotes: getNotes,
  addNotes: addNotes,
  readNote: readNote,
  removeNote: removeNote,
  listNotes: listNotes,
};
