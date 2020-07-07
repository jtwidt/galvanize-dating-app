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
  has_read BOOLEAN DEFAULT false,
  sent_time TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO conversations (user1_id, user2_id)
VALUES (1, 5), (2, 5), (1, 12);

INSERT INTO messages (conversation_id, sender_id, reciever_id, message, has_read)
VALUES (1, 1, 5, 'Hi. How are you?', true), (1, 5, 1, 'Good. You?', false), (2, 2, 5, 'hey', false), (3, 1, 12, 'How are you?', true), (1, 1, 5, 'Yeah? Well I''m the Lord of Time. There''s something else I''ve always wanted to say: Allons-y, Alonso! I''d call you a genius, except I''m in the room. There was a war. A Time War. The Last Great Time War. My people fought a race called the Daleks, for the sake of all creation. And they lost. We lost. Everyone lost. They''re all gone now. My family. My friends. Even that sky. I''ll tell you what, then: don''t...step on any butterflies. What have butterflies ever done to you? Goodbye...my Sarah Jane! What? What?! WHAT?!', true);