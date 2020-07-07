import React, { useState, useEffect } from 'react';
import ChatList from '../chatlist/ChatList';
import axios from 'axios';
import { Button, withStyles } from '@material-ui/core';
import styles from './styles';
import ChatView from '../chatview/ChatView';

const Dashboard = (props) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);

  const selectChat = (chatIndex) => {
    setSelectedChatId(chatIndex);
  };

  const changeUser = (userId) => {
    if (currentUserId === 1) {
      setCurrentUserId(2);
    } else {
      setCurrentUserId(1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/messageList/${currentUserId}`
      );
      setChats(response.data);
      const usersResponse = await axios.get('http://localhost:3000/users');
      setAllUsers(usersResponse.data);
      if (selectedChatId !== null) {
        const chatResponse = await axios.get(
          `http://localhost:3000/api/messages/${selectedChatId}`
        );
        setSelectedChat(chatResponse.data);
      }
    };
    fetchData();
  }, [currentUserId, selectedChatId]);

  const { classes } = props;

  if (allUsers === [] && chats === []) {
    return null;
  } else {
    return (
      <div>
        <ChatList
          selectChat={selectChat}
          chats={chats}
          selectedChat={selectedChatId}
          currentUser={currentUserId}
          allUsers={allUsers}
        ></ChatList>
        {newChatFormVisible ? null : (
          <ChatView
            currentUser={currentUserId}
            selectedChat={selectedChat}
          ></ChatView>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={changeUser}
          className={classes.changeUserBtn}
        >
          Change User
        </Button>
      </div>
    );
  }
};

export default withStyles(styles)(Dashboard);
