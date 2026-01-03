const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// --- YAHAN APNA LINK PASTE KAREIN ---
// <db_password> ko hata kar apna password likhein
const mongoURI ="mongodb+srv://yc9956434_db_user:yash8545015504@cluster0.xdpdpbi.mongodb.net/lifestyleDB?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB Atlas se connect karna
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Atlas Connected Successfully!"))
    .catch(err => console.error("❌ Connection Error: ", err));

// Database ka structure (Schema) tay karna
const commentSchema = new mongoose.Schema({
    name: String,
    text: String,
    date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', commentSchema);

// API 1: Saare comments ko database se nikalna (GET)
app.get('/api/comments', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ date: -1 });
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: "Data nahi mil raha" });
    }
});

// API 2: Naya comment save karna (POST)
app.post('/api/comments', async (req, res) => {
    try {
        const newComment = new Comment({
            name: req.body.name,
            text: req.body.text
        });
        await newComment.save();
        res.json(newComment);
    } catch (err) {
        res.status(500).json({ error: "Comment save nahi ho paya" });
    }
});

// Server Start karna
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});