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
        padding: 12px;
        width: 48px;
        height: 48px;
        background-color: #FF7B0A;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 700;
        font-family: sans-serif;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        transition: background-color 0.3s ease-in-out;
        z-index: 9000;
    }

    .chat-toggle img {
        width: 24px;
        height: 24px;
    }

    .chat-window {
        display: none;
        position: fixed;
        bottom: 1rem;
        right: 1rem;
        font-family: sans-serif;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 12px;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
        z-index: 9000;
    }

    .chat-window.show {
        display: block;
        box-sizing: border-box;
        opacity: 1;
        width: 366px;
        height: 572px;
        animation: open-chat 0.3s ease-in-out;
    }

    @keyframes open-chat {
        from {
            width: 0px;
            height: 0px;
            opacity: 0;
        }
        to {
            width: 366px;
            height: 572px;
            opacity: 1;
        }
    }

    .chat-header {
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #FF7B0A;
        color: #fff;
        border-radius: 12px 12px 0 0;
        height: 88px;
    }

    .chat-header__bot-nick {
        width: fit-content;
        height: fit-content;
        display: flex;
    }

    .chat-header__bot-nick img {
        width: 46px;
        height: 46px;
        margin-right: 10px;
    }

    .chat-header__text {}

    .chat-header__name {
        font-size: 18px;
        font-weight: 600;
        line-height: 26px;
        margin: 0;
        padding: 0;
    }

    .chat-header__subtitle {
        font-size: 14px;
        font-weight: 400;
        line-height: 22px;
        margin: 0;
        padding: 0;
    }

    .chat-header__close-btn {
        background-color: #FF9A32;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        height: 46px;
        width: 46px;
        padding: 11px;
    }

    .chat-header__close-btn img {
        width: 8px;
        height: 8px;
        margin: 8px;
    }

    .chat-messages {
        box-sizing: border-box;
        height: 324px;
        width: 326px;
        overflow-y: scroll;
        padding: 0.5rem;
        margin: 20px auto;
        display: flex;
        flex-direction: column;
    }

    .bot-message, .user-message {
        display: flex;
        flex-direction: column-reverse;
        box-sizing: border-box;
        margin-bottom: 10px;
        padding: 12px 16px;
        border-radius: 12px;
        max-width: 220px;
        overflow-wrap: break-word;
        animation: add-message 0.3s ease forwards;
    }

    .bot-message .chat-message, .user-message .chat-message {
        font-size: 14px;
        line-height: 22px;
        margin: 0 0 12px 0;
    }

    .bot-message .chat-time, .user-message .chat-time {
        font-size: 10px;
        line-height: 18px;
        text-align: right;
        margin: 0;
    }

    .bot-message {
        background-color: #E5ECFF;
        color: #252528;
    }

    .user-message {
        color: #FFFFFF;
        background-color: #FF9A32;
        align-self: flex-end;
    }

    @keyframes add-message {
        from {
            scaleX(0);
        }
        to {
            scaleX(1);
        }
    }

    .chat-input {
        display: flex;
        box-sizing: border-box;
        width: 326px;
        height: 100px;
        justify-content: space-between;
        background-color: #FF9A32;
        border-radius: 12px;
        margin: 0 20px 20px;
        padding: 12px 16px;
    }

    .chat-input textarea {
        flex: 1;
        border-radius: 5px;
        border: none;
        outline: none;
        background-color: transparent;
        color: #F7F7F8;
        font-size: 14px;
        line-height: 22px;
        resize: none;
    }

    .chat-input textarea::placeholder {
        color: #F7F7F8;
    }

    .chat-input button {
        width: 20px;
        height: 20px;
        border: none;
        cursor: pointer;
        background: none;
    }

    .chat-modal {
        box-sizing: border-box;
        width: 326px;
        height: fit-content;
        border-radius: 12px;
        box-shadow: 0px 1px 3px 0px #0000004D;
        box-shadow: 0px 4px 8px 3px #00000026;
        padding: 20px;
        margin: 40% 20px 0;
    }

    .chat-modal__title {
        font-size: 17.5px;
        font-weight: 700;
        line-height: 26px;
        margin: 0 0 24px 0;
    }

    .chat-modal__name {
        border: 1px solid #DADADD;
        border-radius: 8px;
        outline: none;
        padding: 11px 8px 11px 16px;
        color: #606169;
        font-size: 14px;
        line-height: 22px;
        width: 100%;
        box-sizing: border-box;
        margin: 0 0 24px 0;
    }

    .chat-modal__name::placeholder {
        color: #606169;
    }

    .chat-modal__form button {
        width: 100%;
        padding: 10px 0;
        border-radius: 8px;
        border: none;
        background-color: #FF7B0A;
        color: #FFFFFF;
        font-size: 16px;
        line-height: 24px;
        font-weight: 700;
        cursor: pointer;
        margin: 0;
        box-sizing: border-box;
        text-align: center;
    }

    .chat-modal__form button:disabled {
        background-color: #FFC06D;
        pointer-events: none;
    }

    @media (max-width: 600px) {
        .chat-window {
            right: 1.2%;
        }
    }
`;
document.head.appendChild(style);

const topElement = document.createElement('div');
topElement.classList.add('top-element');
document.body.appendChild(topElement);

const printMessageByCharacter = (message, parentElement, chatMessages) => {
    const messageElement = document.createElement('p');
    messageElement.classList.add('chat-message');
    parentElement.appendChild(messageElement);
    const charsArray = message.split('');
    let result = '';

    const printInterval = setInterval(() => {
        result += charsArray.shift();
        messageElement.textContent = result;
        chatMessages.scrollTop = chatMessages.scrollHeight;
        if (result === message) {
            clearInterval(printInterval);
        }
    }, 50);
}

const addCurrentTime = (parentElement) => {
    const timeElement = document.createElement('p');
    timeElement.classList.add('chat-time');
    const now = new Date();

    const padStart = (number) => {
        return String(number < 10 ? '0' + String(number) : number);
    }

    timeElement.textContent = 
        `${padStart(now.getDate())}.${padStart(now.getMonth() + 1)}.${now.getFullYear()}, ${padStart(now.getHours())}:${padStart(now.getMinutes())}:${padStart(now.getSeconds())}`;
    parentElement.appendChild(timeElement);
}

const chatToggle = document.createElement('button');
chatToggle.classList.add('chat-toggle');
chatToggle.innerHTML = '<img src="chat-open-btn.svg" alt="Open chat" />';
document.body.appendChild(chatToggle);

const chatWindow = document.createElement('div');
chatWindow.classList.add('chat-window');
chatWindow.innerHTML = `
    <div class="chat-header">
        <div class="chat-header__bot-nick">
            <img src="chat-bot-ava.png" alt="Consultant avatar" />
            <div class="chat-header__text">
                <p class="chat-header__name">Елена</p>
                <p class="chat-header__subtitle">Контакт-центр</p>
            </div>
        </div>
        <button class="chat-header__close-btn">
            <img src="chat-close-btn.svg" alt="Close chat" />
        </button>
    </div>
`;
document.body.appendChild(chatWindow);

let socket;

const randomNumber = Math.round(Math.random());

const startSocket = () => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        // socket = new WebSocket('ws://localhost:8080');
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
        // const message = JSON.parse(event.data);
        const message = event.data;
        const chatMessages = chatWindow.querySelector('.chat-messages');
        const botMessage = document.createElement('div');
        botMessage.classList.add('bot-message');
        // botMessage.textContent = message.message;
        chatMessages.appendChild(botMessage);
        addCurrentTime(botMessage);
        printMessageByCharacter(message, botMessage, chatMessages);
    };
}

const startChat = () => {
    const chatWindow = document.querySelector('.chat-window');
    const chatMessages = document.createElement('div');
    chatMessages.classList.add('chat-messages');
    chatWindow.appendChild(chatMessages);

    const chatInput = document.createElement('form');
    chatInput.classList.add('chat-input');
    chatInput.innerHTML = `
        <textarea placeholder="Ваше сообщение..."></textarea>        
        <button type="submit">
            <img src="chat-send-btn.svg" alt="Send message" />
        </button>
    `;
    chatWindow.appendChild(chatInput);

    const submitInput = () => {
        const chatInputText = chatWindow.querySelector('.chat-input textarea');

        if (chatInputText.value.trim() !== '') {
            const message = chatInputText.value;
            const userMessage = document.createElement('div');
            const chatMessages = chatWindow.querySelector('.chat-messages');
            userMessage.classList.add('user-message');

            socket.send(JSON.stringify({
                type: 'message',
                content: message
            }));

            chatMessages.appendChild(userMessage);
            addCurrentTime(userMessage);
            printMessageByCharacter(message, userMessage, chatMessages);
            chatInputText.value = '';
        }
    }

    chatInput.onsubmit = (event) => {
        event.preventDefault();
        submitInput();
    };

    chatInput.onkeydown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            submitInput();
        }
    };

    startSocket();
}

const openModal = () => {
    const chatModal = document.createElement('div');
    chatModal.classList.add('chat-modal');
    chatModal.innerHTML = `
        <form class="chat-modal__form">
            <p class="chat-modal__title">Пожалуйста, представьтесь</p>
            <input type="text" placeholder="Ваше имя" class="chat-modal__name">
            <button type="submit" disabled>Начать диалог</button>
        </form>
    `;

    document.querySelector('.chat-window').appendChild(chatModal);

    document.querySelector('.chat-modal__name').oninput = () => {
        if (document.querySelector('.chat-modal__name').value.trim() !== '') {
            document.querySelector('.chat-modal__form button').removeAttribute('disabled');
        } else {
            document.querySelector('.chat-modal__form button').setAttribute('disabled', true);
        }
    };

    chatModal.querySelector('.chat-modal__form').onsubmit = (event) => {
        event.preventDefault();
        chatModal.remove();
        startChat();
    };
}

const openChat = () => {
    chatWindow.classList.add('show');
    chatToggle.style.display = 'none';

    if (chatWindow.lastElementChild.className !== 'chat-modal') {
        openModal();
    }
}

chatToggle.onclick = () => openChat();

topElement.onmouseover = () => openChat();

const closeButton = chatWindow.querySelector('.chat-header__close-btn');
closeButton.onclick = () => {
    chatWindow.classList.remove('show');
    chatToggle.style.display = 'block';

    document.querySelector('.chat-messages').remove();
    document.querySelector('.chat-input').remove();

    socket.send(JSON.stringify({ 
        type: 'submission_complete'
    }));

    socket.close();
};
