const express = require('express');
const fs = require('fs');
const gm = require('gm');
const Busboy = require('busboy');
const app = express();
const port = 9000;

app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index')
});

app.get('/ping', (request, response) => {
    response.send('Pong!');
});

app.post('/crop', (request, response) => {
    const busboy = new Busboy({ headers: request.headers });
    let temp = {};
    let imageTemp = [];
    busboy.on('file', (fieldName, file) => {
        file.on('data', function(data) {
            imageTemp.push(data);
        });
    });
    busboy.on('field', function(fieldname, val) {
        temp[fieldname] = val;
    });
    busboy.on('finish', function() {
        // console.log('Done parsing form!');
        const imageBuf = Buffer.concat(imageTemp);
        const { image, width, height } = temp;
        gm(imageBuf, 'img.png')
            .crop(width, height)
            .write(`${__dirname}/tmp.png`, (err) => {
                if (err) {
                    console.log(err);
                    response.send(err);
                } else {
                    response.sendFile(`${__dirname}/tmp.png`);
                }
            });
    });
    request.pipe(busboy);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
