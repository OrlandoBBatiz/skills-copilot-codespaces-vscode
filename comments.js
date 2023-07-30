// Create web server

// Import modules
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Create web server
const app = express();

// Set port
const port = process.env.PORT || 3000;

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Set body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Get comments
app.get('/api/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data));
    });
});

// Add comment
app.post('/api/comments', (req, res) => {
    fs.readFile('./data/comments.json', 'utf8', (err, data) => {
        let comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile('./data/comments.json', JSON.stringify(comments), 'utf8', (err) => {
            res.json(comments);
        });
    });
});

// Delete comment
app.delete('/api/comments/:id', (req, res) => {
    fs.readFile('./data/comments.json', 'utf8', (err, data) => {
        let comments = JSON.parse(data);
        comments = comments.filter((comment) => {
            return comment.id !== req.params.id;
        });
        fs.writeFile('./data/comments.json', JSON.stringify(comments), 'utf8', (err) => {
            res.json(comments);
        });
    });
});

// Start server
app.listen(port, () => console.log(`Server started on port ${port}`));