import React, { useState } from 'react';
import styled from 'styled-components';
import Image from './ProfilePic';
import Spinner from './LoadSpinner';
import TypingText from './typingText';

const ChatContainer = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 300px;
  height: ${({closed}) => closed ? '40.6px' : '400px'};
  background-color: white;
  border: 1px solid gray;
  border-radius: 5px;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightgray;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const ChatTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
`;

const ChatCloseButton = styled.button`
  background-color: transparent;
  border: 0;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  color: gray;
  &:hover {
    color: black;
  }
`;

const ChatBody = styled.div`
  overflow-y: auto;
  height: calc(100% - 111px);
  padding: 10px;
`;

const ChatMessage = styled.div`
  margin-left: 15px;
`;

const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  margin-bottom: 10px;
`;

const ChatInputContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0px;
  align-items: center;
  width: 100%;
  height: 50px;
  background-color: lightgray;
`;

const ChatInput = styled.input`
  flex: 1;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  outline: none;
  font-size: 14px;
`;

const ChatSendButton = styled.button`
  width: 80px;
  height: 100%;
  background-color: lightgreen;
  border: 0;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  color: white;
  &:hover {
    background-color: green;
  }
`;

const Chat = ({items=[], setChat, user, onSubmit, supportInput, setSupportInput}) => {
    const [minimized, setMinimized] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const handleSendMessage = async (e) => {
        if (supportInput) {
          setChat([...items, {
                text: supportInput, 
                updatedAt: new Date(),
                profilePic: user?.profilePic || 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914234/testimonial_8_qce67b.jpg'
          }]);
          setLoading(true)
          setSupportInput('');
          const myAnswer = await onSubmit(e, 'chat')
          setChat([...items, 
          {
            text: supportInput, 
            updatedAt: new Date(),
            profilePic: user?.profilePic || 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914234/testimonial_8_qce67b.jpg'
          },
          {
            text: myAnswer,
            updatedAt: new Date(),
            profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914235/testimonial_12_k3c5lq.jpg'
          }])
          setLoading(false)
          setSupportInput('');
        }
    };

    const updateInput = (e) => {
        console.log(e.target.value)
        setSupportInput(e?.target?.value)
    }

    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        handleSendMessage(e);
      }
    };

  return (
    <ChatContainer closed={minimized}>
        <ChatHeader>
        <ChatTitle>Chat</ChatTitle>
        <ChatCloseButton onClick={() => setMinimized(!minimized)}>
            {minimized ? '⊞' : '×'}
        </ChatCloseButton>
        </ChatHeader>
        {!minimized && (
        <>
            <ChatBody>
            {items?.sort((a, b) => a?.updatedAt - b?.updatedAt).map((item, key) => {
              console.log('key', key)
              console.log('items.length', items.length)
                return (
                    <Row>
                        <Image size={28} src={!(items[key - 1]?.profilePic === item?.profilePic) ? item?.profilePic : ''} />
                        <ChatMessage key={key}><TypingText isTyped={key === items.length - 1}>{item?.text}</TypingText></ChatMessage>                 
                    </Row>

                )
            })}
            {loading && <SpinnerContainer><Spinner /></SpinnerContainer>}
            </ChatBody>
            <ChatInputContainer>
               <ChatInput onKeyDown={e => handleKeypress(e)} type="text" value={supportInput || ''} onChange={e => updateInput(e)} placeholder="Type a message..." />  
               <ChatSendButton onClick={e => handleSendMessage(e)}>send</ChatSendButton>           
            </ChatInputContainer>

        </>
        )}
    </ChatContainer>
  );
}

export default Chat;