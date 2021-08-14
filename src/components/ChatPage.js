import React, { useState } from 'react';

import {
  GetOnlineNumber,
  GetRoomNames,
  GetData,
  setDataToDatabase,
} from '../hooks/useRealtimeData';

import { UsePresence } from '../hooks/usePresence';

import { useLocation } from 'react-router';
import _ from 'lodash';
import firebase from '../firebase/firebase';

import Chat from './Chat';
import TextBox from './TextBox';
import TopSection from './TopSection';
import List from './List';
import ListItem from './ListItem';
import { Flex, Text } from '@chakra-ui/react';
import Moment from "moment"


export default function ChatPage() {
  // Username from Login Page ( Main Page )
  const location = useLocation();
  const [username] = useState(location.state ? location.state.username : "Anonim" );

  let date = Moment(new Date()).format('DD/MM/YYYY HH:mm:ss');

  // Chat Text Area - Input
  const [message, setMessage] = useState('');

  // Add New Room Input - Create new Room
  const [createRoomName, setCreateRoomName] = useState('');

  // Click on Rooms - Shows chats.
  const [selectedRoom, setSelectedRoom] = useState('');
  
  const [onlineNumbers, userData] = GetOnlineNumber(selectedRoom);
  
  const createRoom = () => {
    if(createRoomName.length  && !roomNames.filter(({id}) => id === _.toLower(createRoomName)).length)   {
      setDataToDatabase(
        username,
        'Odayı oluşturdu.',
        _.toLower(createRoomName),
        );
      }
      setCreateRoomName('');
    };
    
    const [roomNames] = GetRoomNames([createRoom]);

  const selectRoom = (roomId) => {
    setSelectedRoom(roomId);
    firebase
      .database()
      .ref('status/' + firebase.auth().currentUser.uid)
      .set({
        username: username,
        room: roomId,
        state: 'online',
        last_changed: firebase.database.ServerValue.TIMESTAMP,
      });
  };

  const [data] = GetData(selectedRoom);
  

  const handleSendData = () => {
    message.length && setDataToDatabase(username, message, selectedRoom);

    setMessage('');
  };

 UsePresence();
  return (
    <Flex flexDir="column">
      <TopSection name={username} />
      <Flex mt="20px">
        <List
          title="Chat Rooms"
          showIcon
          onChange={(e) => setCreateRoomName(e.target.value)}
          value={createRoomName}
          handler={createRoom}
          link
        >
          {roomNames.length ? (
            roomNames.map(({ id, roomName, date }) => (
              <ListItem
                showPeopleCount
                title={roomName}
                subtitle={date}
                handler={() => selectRoom(id)}
                roomName={roomName}
                username={username}
                name={roomName}
                peopleCount={
                  onlineNumbers[id] !== undefined ? onlineNumbers[id] : '0'
                }
              />
            ))
          ) : (
            <Text>Oda Oluşturunuz</Text>
          )}
        </List>
        <Chat
          roomTitle={_.startCase(_.toLower(selectedRoom))}
          handler={handleSendData}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        >
          {data.length ? (
            data.map(({ id, name, message, time }) => (
              <TextBox key={id} user={name + "      "+ time} text={message} />
            ))
          ) : (
            <Text textAlign="center">Lütfen odalardan birini seçiniz!</Text>
          )}
        </Chat>
        <List title={`Members ${userData.length ? userData.length : ""}`}>
          {userData.length ?
            userData.map(({id, username }) => (
              <ListItem
                key={id}
                showAddIcon
                title={username}
                subtitle="Kodluyoruz"
                name={username}
              />
            )) : <div></div>}
        </List>
      </Flex>
    </Flex>
  );
}
