const express = require('express');
const notesRouter = express.Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const generateUuid = require('../helpers/uuid');

// GET all notes
notesRouter.get('/', async (req, res) => {
  try {
    const notesData = await readFromFile('./db/db.json');
    res.json(notesData);
  } catch (err) {
    res.status(500).json({ error: 'Failed to read notes', details: err.message });
  }
});

// POST a new note
notesRouter.post('/', async (req, res) => {
  const { title, text } = req.body;
  if (!title || !text) {
    return res.status(400).json({ error: 'Note title and text are required' });
  }
  
  const newNote = { title, text, id: generateUuid() };
  
  try {
    await readAndAppend(newNote, './db/db.json');
    res.json({ message: 'Note added successfully', note: newNote });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add note', details: err.message });
  }
});

// DELETE a note by ID
notesRouter.delete('/:id', async (req, res) => {
  const noteIdToDelete = req.params.id;
  try {
    const notesData = await readFromFile('./db/db.json');
    const updatedNotes = notesData.filter(note => note.id !== noteIdToDelete);
    
    if (notesData.length === updatedNotes.length) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    await writeToFile('./db/db.json', updatedNotes);
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to process notes', details: err.message });
  }
});

module.exports = notesRouter;
