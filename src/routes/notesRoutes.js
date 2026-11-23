import { Router } from 'express';
import { celebrate, Segments } from 'celebrate';
import {
  getAllNotesSchema,
  noteIdSchema,
  createNoteSchema,
  updateNoteSchema,
} from '../validations/notesValidation.js';
import {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/notesController.js';

const notesRoutes = Router();

notesRoutes.get('/notes', celebrate(getAllNotesSchema), getAllNotes);
notesRoutes.get(
  '/notes/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  getNoteById,
);
notesRoutes.post('/notes', celebrate(createNoteSchema), createNote);
notesRoutes.patch(
  '/notes/:noteId',
  celebrate({
    ...updateNoteSchema,
    [Segments.PARAMS]: noteIdSchema,
  }),
  updateNote,
);
notesRoutes.delete(
  '/notes/:noteId',
  celebrate({ [Segments.PARAMS]: noteIdSchema }),
  deleteNote,
);

export default notesRoutes;
