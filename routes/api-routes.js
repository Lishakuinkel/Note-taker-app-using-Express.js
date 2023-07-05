// Dependencies
const router = require('express').Router();
const fs = require('fs'); // Import fs module
const { v4: uuidv4 } = require('uuid');

// API GET request
router.get('/api/notes', (req, res) => {
    fs.readFile(__dirname + "/../db/db.json", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});


// API POST request
router.post('/api/notes', (req, res) => {
    let notes = [];
    let newnote = { title: req.body.title, text: req.body.text, id: uuid.v4() };

    fs.readFile(__dirname + "/../db/db.json", (err, data) => {
        if (err) throw err;

        notes = JSON.parse(data);
        notes.push(newnote);

        fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(notes), "utf-8", err => {
            if (err) throw err;

            console.log("new note has been saved");
            res.end();
        });
    });
    console.log(newnote);
});

// API DELETE request
router.delete("/api/notes/:id", (req, res) => {
    let noteId = req.params.id;
    fs.readFile(__dirname + "/../db/db.json", (err, data) => {
        if (err) throw err;

        let allNotes = JSON.parse(data);
        const updatedNotes = allNotes.filter(values => values.id != noteId);

        fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(updatedNotes), "utf-8", err => {
            if (err) throw err;
            console.log("specified note has been deleted");
            res.end();
        });

    });
});

module.exports = router;