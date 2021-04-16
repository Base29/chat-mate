const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const socket = io();

// Emitting message to the frontend

socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);

    // Scroll down whenever there is a message
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Submit a message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get Message value
    const msg = e.target.elements.msg.value;

    // Sending a message to the server
    socket.emit('chatMessage', msg);

    // Clear message input field
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus;
});

// Out message to frontend
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML = `<p class="meta">Mary <span>9:15pm</span></p>
    <p class="text">
        ${message}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}
