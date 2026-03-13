const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse POST data from the form
app.use(bodyParser.urlencoded({ extended: true }));

// 1. Home Page (GET Request) - Displays the input form
app.get('/', (req, res) => {
    res.send(`
        <div style="font-family: sans-serif; text-align: center;">
            <h2>Welcome</h2>
            <p>Please enter your name to receive a greeting.</p>
            <form action="/submit-name" method="POST">
                <input type="text" name="userName" placeholder="Enter your name" required>
                <br><br>
                <button type="submit">Get Greeting</button>
            </form>
        </div>
    `);
});

// 2. Handle POST Request - Stores the name in a variable and redirects
app.post('/submit-name', (req, res) => {
    const name = req.body.userName; // Storing the name in a variable
    // Redirecting to the greeting page using a GET request with a query parameter
    res.redirect(`/hello?name=${name}`); 
});

// 3. Greeting Page (GET Request) - Displays the name
app.get('/hello', (req, res) => {
    const name = req.query.name; // Retrieving the name from the URL
    res.send(`
        <div style="font-family: sans-serif; text-align: center;">
            <h1>Hello, ${name}!</h1>
            <br>
            <a href="/">Go Back</a>
        </div>
    `);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});