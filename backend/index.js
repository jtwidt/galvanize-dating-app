const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const db = require('./queries');
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/api/messageList/:userId', db.getChats);
app.get('/api/messages/:conversationId', db.getConversation);

app.post('/api/messages/:conversationId', db.addMessage);
app.post('/api/messages', db.addConversation);

app.delete('/api/messages/:type/:id', db.deleteConversations);

const port = 3000;
app.listen(port, () =>
  console.log(`Database Project API listening on http://localhost:${port}`)
);
