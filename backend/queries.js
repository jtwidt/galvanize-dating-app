const { response } = require('express');

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'postgres',
  host: 'database',
  database: 'postgres',
  password: 'postgres',
  port: 5432,
});

const getChats = (request, response) => {
  let loggedUser = parseInt(request.params.userId);
  pool.query(
    'SELECT id, user1_id, user2_id FROM conversations WHERE user1_id = $1 OR user2_id = $1',
    [loggedUser],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(JSON.stringify(results.rows));
    }
  );
};

const getConversation = (request, response) => {
  let conversationId = parseInt(request.params.conversationId);
  pool.query(
    'SELECT c.id as ConvoId, m.id as MsgId, m.sender_id as Sender, m.reciever_id as Reciever, m.message as Message, m.sent_time as Time FROM conversations c INNER JOIN messages m ON m.conversation_id = c.id WHERE c.id = $1',
    [conversationId],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(JSON.stringify(results.rows));
    }
  );
};

const addMessage = (request, response) => {
  let conversationId = parseInt(request.params.conversationId);
  let { sender, reciever, message } = request.body;
  if (sender && reciever && message) {
    pool.query(
      'INSERT INTO messages (conversation_id, sender_id, reciever_id, message) VALUES ($1, $2, $3, $4)',
      [conversationId, sender, reciever, message],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(JSON.stringify('New message added'));
      }
    );
  }
};

const addConversation = (request, response) => {
  let { sender, reciever, message } = request.body;
  let conversationId;
  if (sender && reciever && message) {
    pool.query(
      'INSERT INTO conversations (user1_id, user2_id) VALUES ($1, $2) RETURNING id',
      [sender, reciever],
      (error, results) => {
        if (error) {
          throw error;
        }
        conversationId = results.rows[0];
      }
    );
    pool.query(
      'INSERT INTO messages (conversation_id, sender_id, reciever_id, message) VALUES ($1, $2, $3, $4)',
      [conversationId, sender, reciever, message],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(201).send(JSON.stringify('New conversation created'));
      }
    );
  }
};

const deleteConversations = (request, response) => {
  let type = request.params.type;
  let id = parseInt(request.params.id);

  switch (type) {
    case 'conversation':
      pool.query(
        'DELETE FROM conversations WHERE id = $1',
        [id],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.send(
            JSON.stringify(`Conversation with conversation id ${id} deleted`)
          );
        }
      );
      break;
    case 'user':
      pool.query(
        'DELETE FROM conversations WHERE user1_id = $1 OR user2_id = $1',
        [id],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.send(
            JSON.stringify(`Conversations with user id ${id} deleted`)
          );
        }
      );
      break;
  }
};

module.exports = {
  getChats,
  getConversation,
  addMessage,
  addConversation,
  deleteConversations,
};
