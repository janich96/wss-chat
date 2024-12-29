const style = document.createElement('style');
style.textContent = `
    .top-element {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 5px;
    }

    .chat-toggle {
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        padding: 0.5rem 1rem;
        background-color: #007BFF;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 700;
        font-family: sans-serif;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
        z-index: 9000;
    }

    .chat-toggle:hover {
        background-color: #0056b3;
    }

    .chat-window {
        display: none;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        font-family: sans-serif;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        z-index: 9000;
    }

    .chat-window.show {
        display: block;
        opacity: 1;
        width: 400px;
        height: 600px;
        animation: open-chat 0.3s ease-in-out;
    }

    @keyframes open-chat {
        from {
            width: 0px;
            height: 0px;
            opacity: 0;
        }
        to {
            width: 400px;
            height: 600px;
            opacity: 1;
        }
    }

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        background-color: #007BFF;
        color: #fff;
        border-radius: 5px 5px 0 0;
    }

    .chat-header span {
        font-weight: bold;
        font-size: 1.2rem;
    }

    .chat-header .close-button {
        background-color: transparent;
        border: none;
        color: #fff;
        font-weight: 700;
        cursor: pointer;
    }

    .chat-messages {
        height: 500px;
        overflow-y: scroll;
        padding: 0.5rem;
        display: flex;
        flex-direction: column;
    }

    .bot-message {
        margin-bottom: 0.5rem;
        padding: 0.25rem;
        background-color: #007BFF;
        color: #fff;
        border-radius: 5px;
        width: 90%;
        animation: add-message 0.3s;
    }

    .user-message {
        margin-bottom: 0.5rem;
        padding: 0.25rem;
        background-color:#ddd;
        border-radius: 5px;
        width: 90%;
        animation: add-message 0.3s;
        align-self: flex-end;
    }

    @keyframes add-message {
        from {
            width: 0;
        }
        to {
            width: 90%;
        }
    }

    .chat-input {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
    }

    .chat-input input {
        flex: 1;
        padding: 0.25rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        outline: none;
    }

    .chat-input button {
        margin-left: 0.5rem;
        padding: 5px 10px;
        background-color: #007BFF;
        color: #fff;
        font-weight: 700;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
    }

    .chat-input button:hover {
        background-color: #0056b3;
    }

    @media (max-width: 600px) {
        .chat-window.show {
            width: 90%;
            height: 95%;
        }

        .chat-messages {
            height: 87%;
        }
    }
`;
document.head.appendChild(style);

const topElement = document.createElement('div');
topElement.classList.add('top-element');
document.body.appendChild(topElement);

const printMessageByCharacter = (message, parentElement, chatMessages) => {
    const charsArray = message.split('');
    let result = '';
    const printInterval = setInterval(() => {
        result += charsArray.shift();
        parentElement.textContent = result;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        if (result === message) {
            clearInterval(printInterval);
        }
    }, 100);
}

const chatToggle = document.createElement('button');
chatToggle.classList.add('chat-toggle');
chatToggle.textContent = 'Chat';
document.body.appendChild(chatToggle);

const chatWindow = document.createElement('div');
chatWindow.classList.add('chat-window');
chatWindow.innerHTML = `
    <div class="chat-header">
        <span>Chat</span>
        <button class="close-button">X</button>
    </div>
    <div class="chat-messages"></div>
    <form class="chat-input">
        <input type="text">
        <button type="submit" class="send-button">Send</button>
    </form>
`;
document.body.appendChild(chatWindow);
// ws://213.219.228.90:8321/ws/chat ws://localhost:8080
// const socket = new WebSocket('ws://213.219.228.90:8321/ws/chat');

let socket;

const randomNumber = Math.round(Math.random());

const openChat = () => {
    chatWindow.classList.add('show');
    chatToggle.style.display = 'none';

    if (!socket || socket.readyState !== WebSocket.OPEN) {
        socket = new WebSocket('ws://213.219.228.90:8321/ws/chat');
    }
    
    socket.onopen = () => {
        socket.send(JSON.stringify({ 
            type: 'init_url', 
            url: 'https://example.com', 
            behavior_score: randomNumber 
        }));
        
        console.log('WebSocket connection opened');
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onclose = (event) => {
        console.log(`Connection closed. Code: ${event.code}, Reason: ${event.reason}`);
    };

    socket.onmessage = (event) => {
        // console.log(event.data);
        console.log(event);
        // const message = JSON.parse(event.data);
        const message = event.data;
        const chatMessages = chatWindow.querySelector('.chat-messages');
        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        // botMessage.textContent = message.message;
        chatMessages.appendChild(botMessage);
        printMessageByCharacter(message, botMessage, chatMessages);
    };
}

chatToggle.onclick = () => openChat();

topElement.onmouseover = () => openChat();

const closeButton = chatWindow.querySelector('.close-button');
closeButton.onclick = () => {
    chatWindow.classList.remove('show');
    chatToggle.style.display = 'block';

    socket.send(JSON.stringify({ 
        type: 'submission_complete'
    }));

    socket.close();
};

const chatInput = chatWindow.querySelector('.chat-input input');
const chatInputForm = chatWindow.querySelector('.chat-input');
chatInputForm.onsubmit = (event) => {
    event.preventDefault();
    if (chatInput.value.trim() !== '') {
        const message = chatInput.value;
        const userMessage = document.createElement('div');
        const chatMessages = chatWindow.querySelector('.chat-messages');
        userMessage.classList.add('user-message');

        socket.send(JSON.stringify({ 
            type: 'message',
            content: message
        }));

        chatMessages.appendChild(userMessage);
        printMessageByCharacter(message, userMessage, chatMessages);
        chatInput.value = '';
    }
};
