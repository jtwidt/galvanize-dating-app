DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS messages;

CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  user1_id INT,
  user2_id INT
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INT REFERENCES conversations(id) ON DELETE CASCADE,
  sender_id INT,
  reciever_id INT,
  message TEXT,
  has_read BOOLEAN,
  sent_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO conversations (user1_id, user2_id)
VALUES (1, 5), (2, 5), (1, 12);

INSERT INTO messages (conversation_id, sender_id, reciever_id, message, has_read)
VALUES (1, 1, 5, 'Hi. How are you?', true), (1, 5, 1, 'Good. You?', false), (2, 2, 5, 'hey', false), (3, 1, 12, 'How are you?', true);