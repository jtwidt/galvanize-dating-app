import React, { useEffect } from 'react';
import styles from './styles';
import { withStyles } from '@material-ui/core/styles';

const ChatView = (props) => {
  const { classes, selectedChat, currentUser, allUsers } = props;

  useEffect(() => {
    const container = document.getElementById('chatview-container');
    if (container) {
      container.scrollTo(0, container.scrollHeight);
    }
  });

  if (selectedChat !== null) {
    let otherUserId =
      selectedChat[0].sender === currentUser
        ? selectedChat[0].reciever
        : selectedChat[0].sender;
    return (
      <div>
        <div className={classes.chatHeader}>
          Your conversation with{' '}
          {allUsers.filter((user) => user.id === otherUserId)[0].first_name}{' '}
          {allUsers.filter((user) => user.id === otherUserId)[0].last_name}
        </div>
        <main id="chatview-container" className={classes.content}>
          {selectedChat.map((msg) => {
            return (
              <div
                key={msg.msgid}
                className={
                  msg.sender === currentUser
                    ? classes.userSent
                    : classes.friendSent
                }
              >
                {msg.message}
              </div>
            );
          })}
        </main>
      </div>
    );
  } else {
    return <main className={classes.content} id="chatview-container"></main>;
  }
};

export default withStyles(styles)(ChatView);
