export interface Note {
  id: number;
  title: string;
  body: string;
}

export interface NoteModification {
  title?: string;
  body?: string;
}

export type NoteCreation = Omit<Note, "id">;
