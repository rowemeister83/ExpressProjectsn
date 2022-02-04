const express = require('express');

const Datastore = require('nedb');

const bodyParser = require('body-parser');
const req = require('express/lib/request');
const res = require('express/lib/response');

const app = express();

const db = new Datastore();

let id = 1;

app.use(bodyparser.json());
app.use(bodyParser.urlencoded({
    extended : true
}));

app.post('/create', (req,res) => {
    console.log('\nCreate - POST');
    let item = { name : req.body.name, _id: id.toString()};
    id++;
    db.insert(item, (err, item) => {
        if (err) res.send(err);
        res.status(201).send(item);
        console.log('created item: ${JSON.stringify(item)}')
    });
});

app.use(express.static(__dirname +'/public'));

app.get('/', (req,res) =>{
    res.end('hello world');
});

app.get('/read', (req,res) =>{
    console.log('\nRead -GET');
    db.find({}, (err, items) => {
        if (err) res.send(err);
        res.status(200).send(items);
        console.log('Reading Items: ${JSON.stringify(items)}');

    })
})

app.get('/read/:id', (req,res) => {
    console.log('\nRead - GET');
    db.find({_id : req.params.id}, (err, item) => {
        if (err) res.send(err);
        res.status(200).send(item);
        console.log('reading item: ${JSON.stringify(item)}');
    });
});

app.listen(8080, () =>{
    console.log('API Listening on http://localhost:8080');
});