const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const roomUsersList = document.getElementById('users');

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// Get room and users
socket.on('roomUsers', ({ room, users }) => {
    console.log('USERS', users);
    outputRoomName(room);
    outputRoomUsers(users);
});

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
    div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

// Add room name to dom
function outputRoomName(room) {
    roomName.innerText = room;
}

// Add users to DOM
function outputRoomUsers(users) {
    roomUsersList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join('')}
    `;
}
