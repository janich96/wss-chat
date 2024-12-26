const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

function broadcastMessage(data, clients) {
    clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

wss.on('connection', (ws, req) => {
    const urlPath = req.url;

    if (urlPath === '/ws/chat_autoinit') {
        ws.send(JSON.stringify({ message: "Здравствуйте! Я готов помочь вам. Чем могу помочь?" }));
    }

    ws.on('message', (message) => {
        let parsedMessage;

        try {
            parsedMessage = JSON.parse(message);
        } catch (error) {
            ws.send(JSON.stringify({ message: "Неверный формат JSON." }));
            return;
        }

        const { type, url, behavior_score, content } = parsedMessage;

        if (type === 'init_url') {
            if (typeof url === 'string' && typeof behavior_score === 'number') {
                ws.send(JSON.stringify({ message: "Чат-бот инициализирован с предоставленной информацией и оценкой поведения." }));
            } else {
                ws.send(JSON.stringify({ message: "Неверный формат данных для init_url. Ожидается строка URL и числовой behavior_score." }));
            }
        } 

        else if (type === 'message') {
            if (typeof content === 'string') {
                broadcastMessage({ message: content }, wss.clients);
            } else {
                ws.send(JSON.stringify({ message: "Неверный формат данных для message. Ожидается строка content." }));
            }
        } 

        else if (type === 'submission_complete') {
            ws.send(JSON.stringify({ message: "Заявка успешно заполнена!" }));
        } 

        else {
            ws.send(JSON.stringify({ message: `Неизвестный тип сообщения: ${type}` }));
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
