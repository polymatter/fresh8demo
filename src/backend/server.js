const express = require('express');
const app = express();
const fs = require('fs');
const port = 5987;

const data = JSON.stringify(JSON.parse(fs.readFileSync(__dirname + '\\..\\sampledata.json')));

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