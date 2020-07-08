import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Paper,
  withStyles,
  CssBaseline,
  Typography,
} from '@material-ui/core';
import styles from './styles';

const NewChat = (props) => {
  const { classes } = props;
  const [username, setUsername] = useState(null);
  const [message, setMessage] = useState(null);

  const userTyping = (type, e) => {
    switch (type) {
      case 'username':
        setUsername(e.target.value);
        break;
      case 'message':
        setMessage(e.target.value);
        break;
    }
  };

  const submitNewChat = async (e) => {
    e.preventDefault();
    let userThere = userExists();
    let chatThere;
    if (userThere !== null) {
      chatThere = chatExists(userThere);
      if (chatThere === null) {
        createChat(userThere);
      } else {
        goToChat(chatThere, userThere);
      }
    }
  };

  const createChat = (newUser) => {
    props.submitNewChat({
      sender: props.currentUser,
      reciever: newUser,
      message: message,
    });
  };

  const goToChat = (index, recieverId) => {
    props.goToChat(index, recieverId, message);
  };

  const userExists = () => {
    let existingId = null;
    props.allUsers.forEach((user) => {
      let fullName = `${user.first_name} ${user.last_name}`;
      if (fullName.toLowerCase() === username.toLowerCase()) {
        existingId = user.id;
      }
    });
    return existingId;
  };

  const chatExists = (recieverId) => {
    let exists = null;
    props.chats.forEach((chat) => {
      if (chat.user1_id === recieverId || chat.user2_id === recieverId) {
        exists = chat.id;
      }
    });
    return exists;
  };

  return (
    <main className={classes.main}>
      <CssBaseline></CssBaseline>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5">
          Send A Message!
        </Typography>
        <form className={classes.form} onSubmit={(e) => submitNewChat(e)}>
          <FormControl fullWidth>
            <InputLabel htmlFor="new-chat-username">
              Enter the name to message
            </InputLabel>
            <Input
              required
              className={classes.input}
              autoFocus
              onChange={(e) => userTyping('username', e)}
              id="new-chat-username"
            ></Input>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel htmlFor="new-chat-message">
              Enter your message
            </InputLabel>
            <Input
              required
              className={classes.input}
              onChange={(e) => userTyping('message', e)}
              id="new-chat-message"
            ></Input>
          </FormControl>
          <Button
            fullWidth
            className={classes.submit}
            variant="contained"
            color="primary"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Paper>
    </main>
  );
};

export default withStyles(styles)(NewChat);
