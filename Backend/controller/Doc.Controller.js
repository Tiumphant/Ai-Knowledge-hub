// controller/DocController.js
import Doc from "../models/Doc.Model.js";

// Get all docs for the user
export const getDocs = async (req, res, next) => {
  try {
    const docs = await Doc.find({ createdBy: req.user.id });
    res.json(docs);
  } catch (err) {
    next(err);
  }
};

// Add a new doc
export const addDoc = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const doc = await Doc.create({ title, content, createdBy: req.user.id });
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

// Update existing doc
export const updateDoc = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const doc = await Doc.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    res.json(doc);
  } catch (err) {
    next(err);
  }
};

// Search docs
export const searchDocs = async (req, res, next) => {
  try {
    const { query } = req.query;
    // Simple regex search
    const docs = await Doc.find({ content: { $regex: query, $options: "i" } });
    res.json(docs);
  } catch (err) {
    next(err);
  }
};
