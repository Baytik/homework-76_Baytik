const express = require('express');
const router = express.Router();
const fs = require('fs');
const nanoid = require('nanoid');

router.get('/', (req, res) => {
    const ObjectMassages = [];
    if (req.query.datetime) {
        fs.readdir('./messages', (err, files) => {
            let messages = [];
            files.map(file => {
                const data = fs.readFileSync(`./messages/${file}`);
                messages.push(JSON.parse(data.toString()));
            });

            let dateMessages = [];
            for (let i = 0; i < messages.length; i++) {
                if (req.query.datetime < messages[i].datetime) {
                    dateMessages.push(messages[i])
                }
            }
            res.send(dateMessages)
        });

    } else {
    fs.readdir('./messages', (err, files) => {
        files.map(file => {
            const data = fs.readFileSync(`./messages/${file}`);
            ObjectMassages.push(JSON.parse(data.toString()));
        });
        const lastMessages = ObjectMassages.slice(-30);
        res.send(lastMessages)
    });
    }
});

router.post('/', (req, res) => {
    const date = new Date();
    const messageDate = date.toISOString();
    const errorMessage = {
      error: 'Author and message must be present in the request'
    };
    const message = {
        id: nanoid(),
        message: req.body.message,
        author: req.body.author,
        datetime: messageDate
    };

    if (req.body.message === '' || req.body.author === '') {
        res.status(400).send(errorMessage);
    } else {
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
    }
});

module.exports = router;