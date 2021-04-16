const chatForm = document.getElementById('chat-form');
const socket = io();

// Emitting message to the frontend

socket.on('message', (message) => {
    console.log(message);
    outputMessage(message);
});

// Submit a message
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get Message value
    const msg = e.target.elements.msg.value;

    // Sending a message to the server
    socket.emit('chatMessage', msg);
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
