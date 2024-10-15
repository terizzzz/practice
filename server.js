const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
const app = express();

// Middleware
app.use(express.static('public')); // Serve files from the 'public' folder
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Teriz@12345', // Your MySQL password
  database: 'videodb' // We'll create this database soon
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// File upload configuration
const storage = multer.diskStorage({
  destination: './public/uploads',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save file with a unique name
  }
});
const upload = multer({ storage: storage });

// API to upload a video
app.post('/upload', upload.single('video'), (req, res) => {
  const video = req.file.filename;
  const sql = "INSERT INTO videos (filename) VALUES (?)";
  db.query(sql, [video], (err, result) => {
    if (err) throw err;
    res.send({ message: 'Video uploaded', filename: video });
  });
});

// API to fetch video list
app.get('/videos', (req, res) => {
  const sql = "SELECT * FROM videos";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Start the server
app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});
