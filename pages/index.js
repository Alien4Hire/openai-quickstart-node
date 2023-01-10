import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import Chat from '../src/components/chat'

const chatItems = [
  {
      text: `Hello! How may I assist you today?`,
      updatedAt: new Date('Mon Jan 09 2023 20:36:40 GMT-0500 (Eastern Standard Time)'),
      profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914235/testimonial_12_k3c5lq.jpg'
  },
  // {
  //     text: `I'm doing well, thanks for asking. How about you?`,
  //     updatedAt: new Date('Mon Jan 09 2023 20:36:40 GMT-0500 (Eastern Standard Time)'),
  //     profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914235/testimonial_12_k3c5lq.jpg'
  // },
  // {
  //     text: `I'm doing well too, thanks!`,
  //     updatedAt: new Date('Mon Jan 09 2023 20:36:40 GMT-0500 (Eastern Standard Time)'),
  //     profilePic: 'https://res.cloudinary.com/dghsmwkfq/image/upload/v1671914234/testimonial_8_qce67b.jpg'
  // },
]

export default function Home() {
  const [supportInput, setSupportInput] = useState("");
  const [result, setResult] = useState();
  const [chat, setChat] = useState(chatItems);

  async function onSubmit(event, type) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: supportInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      setSupportInput("");
      if (type === 'chat') {
        return data.result
      }
      setResult(data.result);
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Tech support</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Answer my IT questions?</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="question"
            placeholder="Enter a tech question"
            value={supportInput}
            onChange={(e) => setSupportInput(e.target.value)}
          />
          <input type="submit" value="Generate answers" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
      <Chat items={chat} setChat={setChat} onSubmit={onSubmit} supportInput={supportInput} setSupportInput={setSupportInput}/>
    </div>
  );
}
