import React, { useState, useEffect } from 'react';
import ChatList from '../chatlist/ChatList';
import axios from 'axios';
import { Button, withStyles } from '@material-ui/core';
import styles from './styles';
import ChatView from '../chatview/ChatView';
import ChatTextBox from '../chattextbox/ChatTextBox';

const Dashboard = (props) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [sendMsg, setSendMsg] = useState(null);
  const [rerender, setRerender] = useState(true);

  const selectChat = (chatIndex) => {
    setSelectedChatId(chatIndex);
    setRerender(true);
  };

  const recieverClickedChat = () => {
    return selectedChat[selectedChat.length - 1].sender !== currentUserId;
  };

  const messageRead = () => {
    if (selectedChat !== null) {
      let reciever =
        selectedChat[0].sender === currentUserId
          ? selectedChat[0].reciever
          : selectedChat[0].sender;
      if (recieverClickedChat) {
        axios.put(
          `http://localhost:3000/api/messages/${selectedChatId}/${reciever}`,
          null
        );
        setRerender(true);
        console.log('Messages marked read');
      } else {
        console.log('Clicked message where user was the sender');
      }
    }
  };

  const changeUser = (userId) => {
    if (currentUserId === 1) {
      setCurrentUserId(5);
    } else {
      setCurrentUserId(1);
    }
    setSelectedChat(null);
    setSelectedChatId(null);
    setRerender(true);
  };

  const submitMsg = (msg) => {
    let otherUserId =
      selectedChat[0].sender === currentUserId
        ? selectedChat[0].reciever
        : selectedChat[0].sender;

    let msgObj = {
      sender: currentUserId,
      reciever: otherUserId,
      message: msg,
    };
    setSendMsg(msgObj);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/messageList/${currentUserId}`
      );
      setChats(response.data);
      const usersResponse = await axios.get('http://localhost:3000/users');
      setAllUsers(usersResponse.data);
    };
    fetchData();
  }, [currentUserId]);

  useEffect(() => {
    if (selectedChatId !== null && rerender === true) {
      const fetchChatData = async () => {
        const chatResponse = await axios.get(
          `http://localhost:3000/api/messages/${selectedChatId}`
        );
        setSelectedChat(chatResponse.data);
      };
      fetchChatData();
      setRerender(false);
      // messageRead();
    }
  }, [selectedChatId, rerender]);

  useEffect(() => {
    if (sendMsg !== null) {
      axios.post(
        `http://localhost:3000/api/messages/${selectedChatId}`,
        sendMsg
      );
      setSendMsg(null);
      setRerender(true);
    }
  }, [sendMsg]);

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
            allUsers={allUsers}
          ></ChatView>
        )}
        {selectedChat !== null && !newChatFormVisible ? (
          <ChatTextBox
            submitMsg={submitMsg}
            // messageRead={messageRead}
          ></ChatTextBox>
        ) : null}
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
