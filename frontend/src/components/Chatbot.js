import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';
import config from '../config'; // Importa la configuración

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [visible, setVisible] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 10000); // 10 segundos para que el chatbot aparezca

    const instructionsTimer = setTimeout(() => {
      setShowInstructions(false);
    }, 15000); // 5 segundos para que el mensaje de instrucciones desaparezca

    return () => {
      clearTimeout(timer);
      clearTimeout(instructionsTimer);
    };
  }, []);

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');

    const response = await getResponse(input);
    setMessages([...newMessages, { text: response, sender: 'bot' }]);
  };

  const getResponse = async (message) => {
    try {
      console.log('Sending message to API:', message);
      const response = await axios.post(`${config.apiBaseUrl}/api/chat`, { message });
      console.log('API response:', response.data);
      return response.data.response;
    } catch (error) {
      console.error('Error fetching response from backend:', error);
      return 'Lo siento, no puedo ayudarte con ese síntoma. Por favor, consulta a un médico general.';
    }
  };

  return (
    <ChatbotWrapper visible={visible}>
      <ChatbotWindow>
        <ChatbotMessages>
          {showInstructions && (
            <ChatbotMessage sender="bot">
              Bienvenido al chatbot. Escribe tus síntomas y te recomendaré un especialista.
            </ChatbotMessage>
          )}
          {messages.map((message, index) => (
            <ChatbotMessage key={index} sender={message.sender}>
              {message.text}
            </ChatbotMessage>
          ))}
        </ChatbotMessages>
        <ChatbotInputWrapper>
          <ChatbotInput
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu síntoma..."
          />
          <ChatbotButton onClick={handleSendMessage}>Enviar</ChatbotButton>
        </ChatbotInputWrapper>
      </ChatbotWindow>
    </ChatbotWrapper>
  );
};

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

const ChatbotWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  max-height: 400px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transform: translateY(100%);
  animation: ${(props) => (props.visible ? slideUp : 'none')} 0.5s forwards;

  @media (min-width: 768px) {
    width: 550px;
  }
`;

const ChatbotWindow = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatbotMessages = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
`;

const ChatbotMessage = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.sender === 'user' ? '#e0f7fa' : '#f1f1f1')};
  align-self: ${(props) => (props.sender === 'user' ? 'flex-end' : 'flex-start')};
`;

const ChatbotInputWrapper = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
`;

const ChatbotInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 0 0 0 10px;
  outline: none;
`;

const ChatbotButton = styled.button`
  padding: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 0 0 10px 0;
  cursor: pointer;
`;

export default Chatbot;