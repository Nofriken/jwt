import { request, response } from "express";
import Note from "../model/note_model";
import jwt from "jsonwebtoken";

// make a new note
export const addNote = async (req = request, res = response) => {
  const data = await new Note(req.body);
  try {
    const addNew = await data.save();

    const token = await jwt.sign(
      {
        author: req.body.author,
      },
      process.env.SECRET_KEY
    );

    res.json({
      success: true,
      message: "Berhasil membuat catatan",
      token: token,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

// read note data
export const readNote = async (req = request, res = response) => {
  try {
    const data = await Note.find();

    res.json({
      success: true,
      data: {
        note: data,
      },
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

// delete note
export const delete_note = async (req = request, res = response) => {
  try {
    const data_note = await Note.deleteOne({
      _id: req.params.id,
    });

    res.status(200).json({
      success: true,
      message: "Note success to delete",
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};
