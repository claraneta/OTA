import data from "../data/notes.json";
import {
  Note,
  NoteCreation,
  NoteModification,
} from "../interfaces/note.interface";
import fs from "fs";

const dataPath = "./data/notes.json";

export const getNotes = (): Note[] => {
  try {
    return data as Note[];
  } catch (error) {
    throw error;
  }
};

export const getNoteById = (id: number): Note => {
  try {
    const notes = getNotes();
    const [note] = notes.filter((note) => note.id == id);
    return note;
  } catch (error) {
    throw error;
  }
};

export const createNote = (note: NoteCreation): Note => {
  try {
    const notes = getNotes();
    notes.sort((a, b) => {
      return a.id - b.id;
    });
    const newNote: Note = {
      ...note,
      id: notes[notes.length - 1].id + 1,
    };
    notes.push(newNote);
    const stringifyData = JSON.stringify(notes);
    fs.writeFileSync(dataPath, stringifyData);
    //fs.writeFileSync(`${__dirname}\\data\notes.json`, stringifyData);
    return newNote;
  } catch (error) {
    throw error;
  }
};

export const updateNote = (
  toUpdatenote: NoteCreation,
  id: number
): Note => {
  try {
    let note = getNoteById(id);
    if (toUpdatenote.body) note.body = toUpdatenote.body;
    if (toUpdatenote.title) note.title = toUpdatenote.title;

    let notes = getNotes();
    const indexOfNoteToBeUpdated = notes.findIndex(
      (_note) => _note.id === id
    );
    notes.splice(indexOfNoteToBeUpdated, 1, note);

    const stringifyData = JSON.stringify(notes);
    fs.writeFileSync(dataPath, stringifyData);

    return note;
  } catch (error) {
    throw error;
  }
};

export const deleteNote = (id: number): Note => {
  try {
    const noteToBeDeleted = getNoteById(id);

    let notes = getNotes();
    const indexOfNoteToBeDeleted = notes.findIndex(
      (_note) => _note.id === id
    );
    notes.splice(indexOfNoteToBeDeleted, 1);

    const stringifyData = JSON.stringify(notes);
    fs.writeFileSync(dataPath, stringifyData);

    return noteToBeDeleted;
  } catch (error) {
    throw error
  }
}
