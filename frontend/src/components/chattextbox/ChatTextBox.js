import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Send from '@material-ui/icons/Send';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

const ChatTextBox = (props) => {
  const { classes } = props;
  const [chatText, setChatText] = useState('');

  const userTyping = (e) => {
    e.keyCode === 13 ? submitMessage() : setChatText(e.target.value);
  };

  const userClickedInput = () => {
    props.messageRead();
  };

  const submitMessage = () => {
    if (messageValid(chatText)) {
      props.submitMsg(chatText);
      document.getElementById('chattextbox').value = '';
    }
  };

  const messageValid = (txt) => txt && txt.replace(/\s/g, '').length;

  return (
    <div className={classes.chatTextBoxContainer}>
      <TextField
        placeholder="Type your message..."
        onKeyUp={(e) => userTyping(e)}
        id="chattextbox"
        className={classes.chatTextBox}
        onFocus={userClickedInput}
      ></TextField>
      <Send onClick={submitMessage} className={classes.sendBtn}></Send>
    </div>
  );
};

export default withStyles(styles)(ChatTextBox);
