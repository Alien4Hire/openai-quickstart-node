import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Text = styled.span`
  color: #333;
  font-size: 18px;
`;

const TypingText = ({ children, isTyped=true }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      i++;
      setDisplayText(children.substring(0, i));
      if (i === children.length) {
        clearInterval(typingInterval);
      }
    }, 35);

    return () => {
      clearInterval(typingInterval);
    };
  }, [children]);

  return <Text>{isTyped ? displayText : children}</Text>;
};

export default TypingText;