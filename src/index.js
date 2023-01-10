import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import Chat from './components/chat'
import reportWebVitals from './reportWebVitals';

const chatItems = [
  {
      text: `Hello! How are you today?`,
      updatedAt: new Date('Mon Jan 09 2023 20:36:40 GMT-0500 (Eastern Standard Time)'),
      profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914235/testimonial_12_k3c5lq.jpg'
  },
  {
      text: `I'm doing well, thanks for asking. How about you?`,
      updatedAt: new Date('Mon Jan 09 2023 20:36:40 GMT-0500 (Eastern Standard Time)'),
      profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914235/testimonial_12_k3c5lq.jpg'
  },
  {
      text: `I'm doing well too, thanks!`,
      updatedAt: new Date('Mon Jan 09 2023 20:36:40 GMT-0500 (Eastern Standard Time)'),
      profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914234/testimonial_8_qce67b.jpg'
  },
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Chat items={chatItems}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
