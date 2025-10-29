let chatHistory = document.getElementById('chat-history');
let suggestionsContainer = document.getElementById('suggestions');

function addMessage(text, sender) {
    let msg = document.createElement('div');
    msg.className = 'message ' + (sender === 'user' ? 'user-message' : 'bot-message');
    msg.textContent = text;
    chatHistory.appendChild(msg);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function sendMessage() {
    let input = document.getElementById('user-input');
    let message = input.value.trim();
    if (message === '') return;
    addMessage(message, 'user');
    input.value = '';
    fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => {
        addMessage(data.reply, 'bot');
        updateSuggestions(data.suggestions);
    });
}

function updateSuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(s => {
        let btn = document.createElement('div');
        btn.className = 'suggestion';
        btn.textContent = s;
        btn.onclick = () => {
            document.getElementById('user-input').value = s;
            sendMessage();
        };
        suggestionsContainer.appendChild(btn);
    });
}