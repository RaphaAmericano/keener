const path = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const { host, port, user, pass } = require('../config/mail.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});

transport.use('compile', hbs({
    viewEngine: {
        extName: '.handlebars',
        partialsDir: path.join(__dirname, '../mail/'),
        layoutsDir: path.join(__dirname, '../mail/'),
        defaultLayout: false
    },
    viewPath: path.join(__dirname, '../mail/')
}));

module.exports = transport;