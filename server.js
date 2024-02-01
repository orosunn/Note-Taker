const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});


app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    fs.readFile(path.join(__dirname, 'db', 'db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        newNote.id = notes.length + 1;
        notes.push(newNote);
        fs.writeFile(path.join(__dirname, 'db', 'db.json'), JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});