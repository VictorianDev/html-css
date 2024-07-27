const socket = io();

function joinOrkut() {
    const usernameInput = document.getElementById('username-input');
    const username = usernameInput.value;
    if (username.trim() !== '') {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('chat-container').style.display = 'block';
        socket.emit('join', username);
    }
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value;
    if (message.trim() !== '') {
        socket.emit('sendMessage', message);
        input.value = '';
    }
}

socket.on('message', (message) => {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `<strong>${message.user}:</strong> ${message.text}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
});
