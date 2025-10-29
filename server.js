const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

app.post('/api/chat', (req, res) => {
    const userMessage = req.body.message;

    // TODO: Replace this with actual backend logic
    const reply = `Echo: ${userMessage}`;
    const suggestions = ['Tell me more', 'What do you mean?', 'Can you elaborate?'];

    res.json({ reply, suggestions });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
