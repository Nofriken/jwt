import express from "express";
import { addNote, delete_note, readNote } from "../controller/note_controller";
import { user_mdw, validate_token } from "../middleware/user_mdw";

const note_route = express.Router();

note_route.post("/api/user/create-note", validate_token, addNote);
note_route.get("/api/user/read-note", validate_token, readNote);
note_route.delete("/api/user/remove-note/:id", delete_note);

export default note_route;
