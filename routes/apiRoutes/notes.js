const router = require('express').Router();
const path = require('path');
const { notes } = require('../../data/notes.json');
const fs = require('fs');



function createNewNote(body, notesArray) {
    const note = body
    
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../../data/notes.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    )

    return note
}


router.get('/notes', (req, res) => {
    res.json(notes);
})

router.post('/notes', (req, res) => {
    req.body.id = notes.length.toString()

    const note = createNewNote(req.body, notes)
    res.json(note)
})


module.exports = router;