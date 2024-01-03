const express = require('express');
const app = express();
const path = require('path');
const fs= require('fs')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'Images');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({
    storage: storage,
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("upload");
});

app.post("/upload", upload.single("image"), (req, res) => {
    res.redirect('/uploads');  // Redirect to the uploads page after successful upload
});

app.get("/uploads", (req, res) => {
    // Read the contents of the 'Images' directory
    fs.readdir('Images', (err, files) => {
        if (err) {
            console.error('Error reading Images directory:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.render("upload", { files });
    });
});

app.get("/uploads/:filename", (req, res) => {
    const { filename } = req.params;
    res.sendFile(path.join(__dirname, 'Images', filename));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
