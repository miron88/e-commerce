import express from 'express';
import path from 'path';


// App instance
let app = express();

// Middleware's
app.use(express.static('public'));

// Routes
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './templates/index.html'))
});

// Run server
app.listen(3000, () => {
    console.log('Running at http://localhost:3000')
});