const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const app = express();
const db = require('./queries');
const fs = require('fs');
const users = JSON.parse(fs.readFileSync('./fakeUsers.json'));
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const path = require('path');

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const logger = function (req, res, next) {
  console.log(`[${new Date().toJSON()}] - ${req.method} ${req.url}`);
  next();
};
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  next();
};
app.use(logger);
app.use(allowCrossDomain);

app.get('/api/messageList/:user_id', db.getChats);
app.get('/api/messages/:conversation_id', db.getConversation);
app.get('/api/unread/:user_id', db.getUnread);

app.post('/api/messages/:conversation_id', db.addMessage);
app.post('/api/messages', db.addConversation);

app.delete('/api/messages/:type/:id', db.deleteConversations);

app.put('/api/messages/:conversation_id/:reciever_id', db.updateRead);

// Temporary until other endpoints are configured
app.get('/users/:reciever_id', (request, response) => {
  let userId = request.params.user_id;
  const filteredUsers = users.filter((user) => user.id === user_id);
  response.send(filteredUsers);
});
app.get('/users', (request, response) => {
  response.json(users);
});
// end of temporary block

const port = 3000;
app.listen(process.env.PORT || 3000, '0.0.0.0');
