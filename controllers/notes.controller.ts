import { Response, Request, NextFunction } from "express";
import {
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
} from "../services/notes.services";

export const getAllNotes = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const notes = getNotes();
    res.status(200).send({
      error: 0,
      data: notes,
      message: "Notes successfully fetched",
    });
  } catch (error) {
    res.status(500).send({
      error: 1,
      data: null,
      message: "Server error",
    });
  }
};

export const getNote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!isNumeric(id))
      return res.status(400).send({
        error: 1,
        data: null,
        message: "Id should be valid integer only",
      });
    const note = getNoteById(Number(id));
    if (!note)
      return res.status(400).send({
        error: 1,
        data: null,
        message: "Note not found",
      });
    return res.status(200).send({
      error: 0,
      data: note,
      message: "Note successfully fetched",
    });
  } catch (error) {
    res.status(500).send({
      error: 1,
      data: null,
      message: "Server error",
    });
  }
};

export const updateExistingNote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, body } = req.body;
    if (!isNumeric(id))
      return res.status(400).send({
        error: 1,
        data: null,
        message: "Id should be valid integer only",
      });
    const note = getNoteById(Number(id));
    if (!note)
      return res.status(400).send({
        error: 1,
        data: null,
        message: "Bad request, note id not found",
      });
    const updatedNote = updateNote(
      { title, body },
      Number(id)
    );
    if (!updatedNote)
      return res.status(500).send({
        error: 1,
        data: null,
        message: "Note update failed.",
      });
    return res.status(200).send({
      error: 0,
      data: updatedNote,
      message: "Note updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      error: 1,
      data: null,
      message: "Server error",
    });
  }
};

export const deleteExistingNote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    if (!isNumeric(id))
      return res.status(400).send({
        error: 1,
        data: null,
        message: "Id should be valid integer only",
      });
    const note = getNoteById(Number(id));
    if (!note)
      return res.status(400).send({
        error: 1,
        data: null,
        message: "Note not found",
      });
    const deletedNote = deleteNote(Number(id));
    if (!deletedNote)
      res.status(500).send({
        error: 1,
        data: null,
        message: "Server error",
      });
    return res.status(200).send({
      error: 0,
      data: deleteNote,
      message: "Note successfully deleted",
    });
  } catch (error) {
    res.status(500).send({
      error: 1,
      data: null,
      message: "Server error",
    });
  }
};

export const createNewNote = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, body } = req.body;
    if (!title)
      return res.status(400).send({
        error: 1,
        data: null,
        message: "Title is required",
      });
    if (!body)
      return res.status(400).send({
        error: 1,
        data: null,
        message: "Body is required",
      });

    const newNote = createNote({ title, body });
    if (!newNote)
      return res.status(500).send({
        error: 1,
        data: null,
        message: "Note creation failed",
      });
    return res.status(200).send({
      error: 0,
      data: newNote,
      message: "Note successfully created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: 1,
      data: null,
      message: "Server error",
    });
  }
};

const isNumeric = (value: string) => /^-?\d+$/.test(value);
