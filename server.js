const express = require('express');
const handlebars = require('hbs');
const fs = require('fs');

const app = express();

// ====================
// MIDDLEWARE FUNCTIONS
// ====================
handlebars.registerPartials(`${__dirname}/views/partials`);
app.set('view engine', 'hbs');
app.use((req, res, next) => {

    const now = new Date().toString();
    const log = `${now}: ${req.method} ${req.url}`
    console.log(log);
     fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
     });

    next();
});
app.use((req, res, next) => {
    res.render('maintenance.hbs');
})

app.use(express.static(`${__dirname}/public`));

// ======
// ROUTES
// ======
app.get('/', (req, res) => {
    res.render('home.hbs', {
        username: "Mostafa",
        likes: [
            'Reading',
            'Coding',
            'Learning',
            'Cooking',
            'Chatting'
        ],
        currentYear: new Date().getFullYear()
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About page",
        currentYear: new Date().getFullYear()
    });
});

app.listen(3000, () => {
    console.log(`Server is up on port 3000`);
});