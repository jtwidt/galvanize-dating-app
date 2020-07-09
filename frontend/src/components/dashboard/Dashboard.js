import React, { useState, useEffect } from 'react';
import ChatList from '../chatlist/ChatList';
import axios from 'axios';
import { Button, withStyles } from '@material-ui/core';
import styles from './styles';
import ChatView from '../chatview/ChatView';
import ChatTextBox from '../chattextbox/ChatTextBox';
import NewChat from '../newchat/NewChat';

const Dashboard = (props) => {
  const [selectedChatId, setSelectedChatId] = useState(null);
  const [chats, setChats] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(1);
  const [allUsers, setAllUsers] = useState([]);
  const [newChatFormVisible, setNewChatFormVisible] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [sendMsg, setSendMsg] = useState(null);
  const [rerender, setRerender] = useState(true);
  const [unread, setUnread] = useState([]);
  const [unreadFlag, setUnreadFlag] = useState(true);
  const [rerenderChats, setRerenderChats] = useState(true);
  const [sendChat, setSendChat] = useState({});

  const selectChat = (chatIndex) => {
    setSelectedChatId(chatIndex);
    setRerenderChats(true);
    setRerender(true);
    messageRead();
  };

  const changeUser = (userId) => {
    if (currentUserId === 1) {
      setCurrentUserId(5);
    } else {
      setCurrentUserId(1);
    }
    setSelectedChat(null);
    setSelectedChatId(null);
    setRerenderChats(true);
    setRerender(true);
    setUnread([]);
    setUnreadFlag(true);
  };

  const clickedChatWhereNotSender = () => {
    if (selectedChat !== null) {
      return selectedChat[selectedChat.length - 1].reciever === currentUserId;
    }
  };

  const messageRead = () => {
    if (selectedChatId !== null) {
      if (clickedChatWhereNotSender()) {
        axios.put(`/api/messages/${selectedChatId}/${currentUserId}`, null);
      }
    }
    setUnreadFlag(true);
  };

  const submitMsg = (msg, otherUserId) => {
    let msgObj = {
      sender: currentUserId,
      reciever: otherUserId,
      message: msg,
    };
    setSendMsg(msgObj);
  };

  const newChat = () => {
    setNewChatFormVisible(true);
    setSelectedChatId(null);
    setSelectedChat(null);
  };

  const submitNewChat = (newChat) => {
    setSendChat(newChat);
    setRerenderChats(true);
    setNewChatFormVisible(false);
  };

  const goToChat = (chatIndex, recieverId, message) => {
    setSelectedChatId(chatIndex);
    submitMsg(message, recieverId);
    setNewChatFormVisible(false);
  };

  useEffect(
    () => {
      if (rerenderChats === true) {
        const fetchData = async () => {
          const response = await axios.get(`/api/messageList/${currentUserId}`);
          setChats(response.data);
          const usersResponse = await axios.get('/users');
          setAllUsers(usersResponse.data);
        };
        fetchData();
      }
    },
    [currentUserId],
    [rerenderChats]
  );

  useEffect(() => {
    if (selectedChatId !== null && rerender === true) {
      const fetchChatData = async () => {
        const chatResponse = await axios.get(`/api/messages/${selectedChatId}`);
        setSelectedChat(chatResponse.data);
      };
      fetchChatData();
      setRerender(false);
    }
  }, [selectedChatId, rerender]);

  useEffect(() => {
    if (sendMsg !== null) {
      axios.post(`/api/messages/${selectedChatId}`, sendMsg);
      setSendMsg(null);
      setRerender(true);
    }
  }, [sendMsg]);

  useEffect(() => {
    let convoId;
    if (sendChat !== null) {
      axios.post(`/api/messages/`, sendChat).then((response) => {
        convoId = response.data;
        setSendChat(null);
        selectChat(convoId);
      });
    }
  }, [sendChat]);

  useEffect(() => {
    if (unreadFlag === true) {
      const fetchData = async () => {
        const response = await axios.get(`/api/unread/${currentUserId}`);
        setUnread(
          response.data.map((conversation) => conversation.conversation_id)
        );
      };
      fetchData();
      setUnreadFlag(false);
    }
  }, [unreadFlag]);

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
          unread={unread}
          newChat={newChat}
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
            messageRead={messageRead}
            currentUser={currentUserId}
            selectedChat={selectedChat}
          ></ChatTextBox>
        ) : null}
        {newChatFormVisible ? (
          <NewChat
            allUsers={allUsers}
            chats={chats}
            currentUser={currentUserId}
            submitNewChat={submitNewChat}
            goToChat={goToChat}
          ></NewChat>
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
