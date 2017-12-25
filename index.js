const express = require('express');
const fs = require('fs');
const gm = require('gm');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.set('views', './views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/ping', (request, response) => {
    response.send('Pong!');
});

app.post('/crop', (request, response) => {

    const { width, height, image } = request.body;

    gm(image)
        .crop(width, height)
        .write(`${__dirname}/tmp.png`, (err) => {
            if (err) {
                console.log(err);
                response.send(err);
            } else {
                response.sendFile(`${__dirname}/tmp.png`);
            }
        });

    // fs.unlinkSync(`${__dirname}/tmp.png`); // Delete the temporary file that we created in the cropping task
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
