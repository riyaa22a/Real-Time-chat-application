// script.js
document.getElementById('sendBtn').addEventListener('click', sendMessage);
document.getElementById('msgInput').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const inputField = document.getElementById('msgInput');
  const userMessage = inputField.value.trim();
  if (!userMessage) return;

  appendMessage(userMessage, 'user');
  inputField.value = '';

  fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: userMessage })
  })
    .then(response => response.json())
    .then(data => appendMessage(data.response, 'bot'))
    .catch(error => console.error('Error:', error));
}

function appendMessage(message, sender) {
  const messagesList = document.getElementById('messages');
  const messageElement = document.createElement('li');
  messageElement.classList.add(sender);
  messageElement.textContent = message;
  messagesList.appendChild(messageElement);
  messagesList.scrollTop = messagesList.scrollHeight;
}
