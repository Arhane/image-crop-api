const express = require('express');
const fs = require('fs');
const gm = require('gm');
const Busboy = require('busboy');
const app = express();
const port = 3000;

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
    busboy.on('file', (fieldName, file, filename, encoding, mimetype) => {
        console.log('File [' + fieldName + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
        file.on('data', function(data) {
            console.log('File [' + fieldName + '] got ' + data.length + ' bytes');
        });
        file.on('end', function() {
            console.log('File [' + fieldName + '] Finished');
        });
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
        console.log('Field [' + fieldname + ']: value: ' + val);
    });
    busboy.on('finish', function() {
        console.log('Done parsing form!');
        response.writeHead(303, { Connection: 'close', Location: '/' });
        response.end();
    });
    request.pipe(busboy);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
