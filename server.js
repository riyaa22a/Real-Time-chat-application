// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Predefined Q&A
const qa = {
  'hello': 'Hi there! 👋',
  'how are you?': 'I\'m doing great, thank you!',
  'bye': 'Goodbye! 👋'
};

// Endpoint to handle chat messages
app.post('/chat', express.json(), (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  const botResponse = qa[userMessage] || 'Sorry, I didn\'t understand that.';
  res.json({ response: botResponse });
});

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
