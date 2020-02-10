const express = require('express');
const router = express.Router();
const fs = require('fs');
const nanoid = require('nanoid');

router.get('/', (req, res) => {
    const ObjectMassages = [];
    fs.readdir('./messages', (err, files) => {
        files.map(file => {
            const data = fs.readFileSync(`./messages/${file}`);
            ObjectMassages.push(JSON.parse(data.toString()));
        });
        const lastMessages = ObjectMassages.slice(-30);
        res.send(lastMessages.reverse())
    });
});

router.post('/', (req, res) => {
    const date = new Date();
    const messageDate = date.toISOString();
    const message = {
        id: nanoid(),
        message: req.body.message,
        author: req.body.author,
        datetime: messageDate
    };
    const fileName = `./messages/${messageDate}.txt`;
    const data = JSON.stringify(message, null, 2);
    fs.writeFile(fileName, data, err => {
        if (err) {
            console.log(err)
        } else {
            console.log('File was saved!')
        }
    });
    res.send(message);
});

module.exports = router;