
const express = require('express');
const notesRouter = express.Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const generateUuid = require('../helpers/uuid');


notesRouter.get('/', (req, res) => {
  readFromFile('./db/db.json')
    .then((notesData) => res.json(JSON.parse(notesData)))
    .catch((err) => res.status(500).json({ error: 'Failed to read notes' }));
});


notesRouter.post('/', (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      id: generateUuid(),
    };

    readAndAppend(newNote, './db/db.json')
      .then(() => res.json('Note added successfully'))
      .catch((err) => res.status(500).json({ error: 'Failed to add note' }));
  } else {
    res.status(400).json({ error: 'Note title and text are required' });
  }
});


notesRouter.delete('/:id', (req, res) => {
  const noteIdToDelete = req.params.id;

  readFromFile('./db/db.json')
    .then((notesData) => {
      const existingNotes = JSON.parse(notesData);
      const updatedNotes = existingNotes.filter((note) => note.id !== noteIdToDelete);

      if (existingNotes.length === updatedNotes.length) {
        res.status(404).json({ error: 'Note not found' });
      } else {
        writeToFile('./db/db.json', updatedNotes)
          .then(() => res.json('Note deleted successfully'))
          .catch((err) => res.status(500).json({ error: 'Failed to delete note' }));
      }
    })
    .catch((err) => res.status(500).json({ error: 'Failed to read notes' }));
});

module.exports = notesRouter;
