// Dependencies
const router = require('express').Router();
const fs = require('fs'); // Import fs module
const uuid = require('uuid');

// API GET request
router.get('/api/notes', (req, res) => {
    fs.readFile(__dirname + "/../db/db.json", (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});


// API POST request
router.post('/api/notes', (req, res) => {
    let notesList = [];
    let newnote = { title: req.body.title, text: req.body.text, id: uuid.v1() };

    fs.readFile(__dirname + "/../db/db.json", (err, data) => {
        if (err) throw err;

        notesList = JSON.parse(data);
        notesList.push(newnote);

        fs.writeFile(__dirname + "/../db/db.json", JSON.stringify(notesList), "utf-8", err => {
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
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;

        let allNotes = JSON.parse(data) || [];
        allNotes = allNotes.filter(selected => {return selected.id != noteId});

        fs.writeFile("./db/db.json", JSON.stringify(allNotes), "utf-8", err => {
            if (err) throw err;
            console.log("specified note has been deleted");
            res.json(allNotes);
        });
        

    });
});

module.exports = router;