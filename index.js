const express = require('express');
const fs = require('fs');
const gm = require('gm');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/ping', (request, response) => {
    response.send('Pong!');
});

app.get('/crop', (request, response) => {

    const { width, height } = request.query; // Get the width and height from the request parameters

    gm(`${__dirname}/440639-1280x720.jpg`)
        .crop(width, height)
        .write(`${__dirname}/tmp.png`, (err) => {
            if (err) {
                console.log(err);
                response.send(err);
            } else {
                response.sendFile(`${__dirname}/tmp.png`);
            }
        });

    fs.unlinkSync(`${__dirname}/tmp.png`); // Delete the temporary file that we created in the cropping task
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
