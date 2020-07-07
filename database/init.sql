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
VALUES (1, 1, 5, 'Hi. How are you?', true), (1, 5, 1, 'Good. You?', false), (2, 2, 5, 'hey', false), (3, 1, 12, 'How are you?', true), (1, 1, 5, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel hendrerit risus. In gravida ex pharetra, tempor enim quis, semper erat. Phasellus vitae libero at sapien laoreet mattis. Curabitur imperdiet consequat quam, at auctor eros sagittis sit amet. Integer eget purus et sapien viverra rhoncus porta vel quam. Pellentesque gravida, ante at condimentum ultrices, quam augue mollis massa, vitae viverra ligula eros in dolor. Vestibulum quis lectus turpis. Cras viverra erat erat, id placerat orci semper sit amet. Suspendisse aliquet, massa quis efficitur imperdiet, justo nisl consectetur sapien, convallis malesuada sapien nisi quis massa. Curabitur pretium auctor lobortis. Vivamus mollis est in velit interdum posuere. Nullam vel ullamcorper risus. Curabitur mollis turpis ac ante facilisis, quis mattis eros sodales. Nam eleifend finibus semper. Proin aliquet sem non nulla consequat facilisis quis ac dui. Sed interdum tempus ipsum, ac condimentum neque tincidunt id.\nAenean venenatis odio nec ullamcorper ultricies. Etiam in rutrum massa. Curabitur a elit gravida, venenatis quam vitae, luctus massa. Suspendisse lacus magna, tincidunt eu venenatis tincidunt, vulputate nec augue. Phasellus id ante est. Phasellus non ipsum nulla. Nullam non dignissim nulla. Duis non consectetur quam, eu pulvinar ligula. Donec vel blandit arcu. Phasellus dictum enim at porta dignissim. Praesent sodales leo libero, sit amet pretium arcu dignissim in. Nam condimentum cursus risus sed mollis. Pellentesque at nibh vitae erat vulputate lacinia quis sit amet massa.\nInteger quis facilisis tellus, nec tincidunt eros. Aenean ac turpis vitae dolor dapibus pretium in ut purus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer id mi at lectus mattis aliquet. Nulla a tortor id orci consequat tristique. Suspendisse potenti. Integer dui dolor, malesuada ut elit sit amet, commodo aliquet lectus. Sed ut euismod metus. Mauris euismod lobortis elementum. Suspendisse potenti.\nSuspendisse sapien tortor, dignissim eget efficitur imperdiet, sodales nec enim. Fusce porttitor ligula eu mi commodo pellentesque. Nunc mollis eu mauris ut hendrerit. Nunc consectetur, odio non condimentum varius, ex urna gravida lectus, vel varius diam neque at erat. Suspendisse tempus ante dolor, sit amet accumsan ligula egestas sit amet. Vestibulum imperdiet mauris nec maximus volutpat. Pellentesque odio elit, sodales at scelerisque ut, porta quis libero. Nunc suscipit risus est, sodales mattis urna rutrum non. Mauris nec ligula ut leo lacinia bibendum.\nMaecenas interdum imperdiet ullamcorper. Proin eu purus quis orci finibus varius. Vivamus ultrices aliquam libero, a ullamcorper arcu. Vivamus vel orci a enim tincidunt rhoncus et eget nisl. Maecenas ornare, ante euismod euismod aliquet, neque tellus gravida purus, non ultricies magna magna sed mi. In sed magna quis purus porta consequat et a lectus. Donec at ornare diam. Mauris et ullamcorper metus. Pellentesque accumsan enim a erat dignissim, nec maximus ex egestas. Proin vel mauris luctus, placerat est ultrices, laoreet mi. Nullam tincidunt diam orci, eu placerat tortor ultricies placerat. Nulla accumsan eleifend massa, non placerat arcu venenatis nec. Proin consectetur massa vel dui tincidunt varius. Sed dignissim orci ex, nec egestas purus egestas id. Vivamus ullamcorper, purus in placerat tempor, enim ligula porta turpis, quis tempor justo orci scelerisque augue.', true);