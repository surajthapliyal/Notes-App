const yargs = require("yargs");
const notesFile = require("./notes");
//set yargs version :
// yargs.version("1.1.2");
// console.log(yargs.argv);

yargs.command({
  command: "add",
  description: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesFile.addNotes(argv.title, argv.body);
  },
});
yargs.command({
  command: "remove",
  description: "Remove existing note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesFile.removeNotes(argv.title);
  },
});
yargs.command({
  command: "read",
  description: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notesFile.readNote(argv.title);
  },
});
yargs.command({
  command: "list",
  description: "List all note",
  handler(argv) {
    notesFile.listNotes();
  },
});

yargs.parse();
