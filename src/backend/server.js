const express = require('express');
const app = express();
const fs = require('fs');
const port = 4000;

const data = JSON.stringify(JSON.parse(fs.readFileSync(__dirname + '\\..\\sampledata.json')));

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.get('/api/users.json', (req, res) => {
    res.type('json');
    res.send(data);
})

app.get('/', (req, res) => {
    res.send('This is the root');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})