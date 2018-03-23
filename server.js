//imports//
var express = require("express");
var bodyParser = require("body-parser");
var apiRouter = require('./apiRouter').router;

//instantiate server//
var server = express();

//body parser configuration//
server.use(bodyParser.urlencoded({ extend: true }));
server.use(bodyParser.json());

//configure routes //
server.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1> Prêt à transmettre</h1>');
});
server.use('/api/', apiRouter);

//Launch server //
server.listen(3020, () => {
    console.log('server en écoute ;)');
})