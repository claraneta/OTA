import { Router } from "express";
import {
  createNewNote,
  deleteExistingNote,
  getAllNotes,
  getNote,
  updateExistingNote,
} from "../controllers/notes.controller";

export const noteRouter = Router();

noteRouter.get("/", getAllNotes);
noteRouter.get("/:id", getNote);
noteRouter.post("/", createNewNote);
noteRouter.put("/:id", updateExistingNote);
noteRouter.delete("/:id", deleteExistingNote);
