import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import styles from './styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const ChatList = (props) => {
  const { classes } = props;

  const newChat = () => {
    console.log('New chat');
  };

  const selectChat = (chatIndex) => {
    props.selectChat(chatIndex);
  };

  if (props.chats.length > 0) {
    return (
      <main className={classes.root}>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          className={classes.newChatBtn}
          onClick={newChat}
        >
          New Chat
        </Button>
        <List>
          {props.chats.map((chat, index) => {
            let otherUserId;
            let avatarImg;
            let firstName;
            let lastName;
            if (chat.user1_id === props.currentUser) {
              otherUserId = chat.user2_id;
            } else {
              otherUserId = chat.user1_id;
            }
            let otherUser = props.allUsers.filter(
              (user) => user.id === otherUserId
            );
            if (otherUser.length > 0) {
              avatarImg = otherUser[0].avatar;
              firstName = otherUser[0].first_name;
              lastName = otherUser[0].last_name;
            }
            return (
              <div key={chat.id}>
                <ListItem
                  onClick={() => selectChat(chat.id)}
                  className={classes.listItem}
                  selected={props.selectedChat === chat.id}
                  alignItems="flex-start"
                >
                  <ListItemAvatar>
                    <Avatar alt="Joe Kerr" src={avatarImg} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${firstName} ${lastName}`}
                  ></ListItemText>
                </ListItem>
                <Divider></Divider>
              </div>
            );
          })}
        </List>
      </main>
    );
  } else {
    return (
      <main>
        <Button
          variant="contained"
          fullWidth
          color="primary"
          className={classes.newChatBtn}
          onClick={newChat}
        >
          New Chat
        </Button>
        <List></List>
      </main>
    );
  }
};

export default withStyles(styles)(ChatList);
