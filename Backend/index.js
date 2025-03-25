require("dotenv").config();

const express = require('express')
const cors = require('cors')
const app = express();
const config = require('./config.json')
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const { authenticateToken } = require("./utilities")
const User = require('./models/user.model')
const Note = require('./models/note.model')
const bcrypt = require('bcrypt')

mongoose.connect(config.connectionString)
const db = mongoose.connection

db.on('connected', ()=>{
    console.log('DB Connected');
})

db.on('error', ()=>{
    console.error('DB Connection Error:', err);
})

app.use(express.json());

app.use(
    cors({
        origin: "*"
    })
);

//Create Account
app.post("/signup", async (req, res) => {
    const { fullName, email, password } = req.body;

    if (!fullName)
        return res.status(400).json({ error: true, message: "Full Name Required!" })
    if (!email)
        return res.status(400).json({ error: true, message: "Email is Required!" })
    if (!password)
        return res.status(400).json({ error: true, message: "Password is Required!" })

    const isUser = await User.findOne({ email })

    if (isUser)
        return res.status(400).json({ error: true, message: "Email already exists" })

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        fullName,
        email,
        password: hashedPassword
    })

    await user.save();

    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "36000m",
    })

    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Sucessfull!"
    })
})

//Login
app.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (!email)
        return res.status(400).json({ error: true, message: "Email is Required!" })
    if (!password)
        return res.status(400).json({ error: true, message: "Password is Required!" })

    const userInfo = await User.findOne({ email })

    if (!userInfo)
        return res.status(400).json({ error: true, message: "No such user exists" })

    const passwordMatch = await bcrypt.compare(password, userInfo.password);

    if (passwordMatch) {
        const user = { user: userInfo }
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m"
        });

        return res.json({
            error: false,
            message: "Login Successfull",
            user,
            accessToken
        })
    } else {
        return res.json({
            error: true,
            message: "Invalid Credentials"
        })
    }
})

app.get("/get-user", authenticateToken, async(req, res) => {
    const {user} = req.user

    const isUser = await User.findOne({_id: user._id})

    if(!isUser)
        return res.status(404)

    return res.json({
        error: false,
        user: isUser,
        message: "User information retrieved successfully!"
    })
})

//Add New Notes
app.post("/add-note", authenticateToken, (req, res) => {
    const { title, content, tags } = req.body
    const { user } = req.user

    if (!title)
        return res.status(400).json({ error: true, message: "Title is Required!" })
    if (!content)
        return res.status(400).json({ error: true, message: "Content is Required!" })

    const note = new Note({
        title,
        content,
        tags: tags || [],
        userId: user._id
    })

    note.save();

    return res.json({
        error: false,
        message: "Note Added Successfully!",
        note
    })
})

//Edit Notes
app.put("/edit-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, isPinned, tags } = req.body
    const { user } = req.user

    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "No changes provided!" })
    }

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id })
        if (!note)
            return res.status(404).json({ error: true, message: "Note not found!" })

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        note.save();

        return res.json({
            error: false,
            note,
            message: "Note updated successfully"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})

//Get All Notes
app.get("/get-all-notes", authenticateToken, async (req, res) => {
    const { user } = req.user

    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 })

        return res.json({
            error: false,
            notes,
            message: "All notes retrived successfully!"
        })

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        })
    }
})

app.delete("/delete-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId
    const { user } = req.user

    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id })

        if (!note)
            return res.status(404).json({ error: true, message: "Note not found!" })

        await Note.deleteOne({ _id: noteId, userId: user._id })

        return res.json({
            error: false,
            message: "Note Deleted Successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error!"
        })
    }
})

app.put("/pin-note/:noteId", authenticateToken, async (req, res) => {
    const noteId = req.params.noteId
    const { user } = req.user

    const note = await Note.findOne({ _id: noteId, userId: user._id })

    if (!note)
        return res.status(404).json({
            error: true,
            message: "Note not found!"
        })

    note.isPinned = !note.isPinned

    note.save();

    return res.json({
        error: false,
        message: "Note Updated!"
    })
})

app.listen(8000, (err, res)=>{
    console.log("Server running on 8000")
});

module.exports = app;