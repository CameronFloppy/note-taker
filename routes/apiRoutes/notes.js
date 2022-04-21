const router = require('express').Router();
const { notes } = require('../../db/notes.json');
const fs = require('fs');
const path = require('path');


function createNewNote(body, notesArray) {
    const note = body
    
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../db/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )

    return note
}

function removeById(id, notesArray) {

    const result = notesArray.filter(note => note.id === id)[0];
    fs.writeFileSync(
        path.join(__dirname, '../../db/notes.json'),
        JSON.stringify({ notes: result }, null, 2)
    )

    return result;
}

router.get('/notes', (req, res) => {
    res.json(notes);
})

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString()

    const note = createNewNote(req.body, notes)
    res.json(note)
})

router.delete('/notes/:id', (req, res) => {
    const id = req.params.id.toString()
    removeById(id, notes)
})

module.exports = router;