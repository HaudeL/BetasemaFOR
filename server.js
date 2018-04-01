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

// configure Nodemailer
var  hbs = require('nodemailer-express-handlebars'),
  email = process.env.MAILER_EMAIL_ID || 'haude.lecamus@gmail.com',
  pass = process.env.MAILER_PASSWORD || '29Haude29'
  nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: email,
    pass: pass
  }
});

var handlebarsOptions = {
  viewEngine: 'handlebars',
  //viewPath: path.resolve('./templates/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));

//Launch server //
server.listen(3020, () => {
    console.log('server en écoute ;)');
})