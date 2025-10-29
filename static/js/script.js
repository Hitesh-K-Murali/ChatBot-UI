const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const suggestionsContainer = document.getElementById('suggestions');

function appendMessage(text, sender) {
    const msg = document.createElement('div');
    msg.classList.add('message', sender);
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage(message) {
    appendMessage(message, 'user');
    fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
    })
    .then(res => res.json())
    .then(data => {
        appendMessage(data.reply, 'bot');
        updateSuggestions(data.suggestions);
    });
}

function updateSuggestions(suggestions) {
    suggestionsContainer.innerHTML = '';
    suggestions.forEach(suggestion => {
        const btn = document.createElement('div');
        btn.classList.add('suggestion');
        btn.textContent = suggestion;
        btn.onclick = () => {
            userInput.value = suggestion;
            sendMessage(suggestion);
        };
        suggestionsContainer.appendChild(btn);
    });
}

userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && userInput.value.trim()) {
        sendMessage(userInput.value.trim());
        userInput.value = '';
    }
});
