import React, { useState } from 'react';
import { ChatFeed, Message } from 'react-chat-ui';
import './Messages.css'; // Make sure to create this CSS file

const botResponses = {
  "hello": "Hi there! How can I help you today?",
  "how are you?": "I'm just a bot, but thanks for asking! How can I assist you?",
  "what's your name?": "I am a chatbot here to assist you.",
  "bye": "Goodbye! Have a great day!",
  "what is ai?": "AI stands for Artificial Intelligence, the simulation of human intelligence by machines.",
  "tell me a joke": "Why don't skeletons fight each other? They don’t have the guts!",
  "what is the capital of france?": "The capital of France is Paris.",
  "what's your favorite color?": "As a bot, I don't have preferences, but I can tell you humans seem to like blue a lot.",
  "what is the meaning of life?": "42. According to 'The Hitchhiker's Guide to the Galaxy'.",
  "what is 2+2?": "2 + 2 equals 4.",
  "who created you?": "I was created by the team at OpenAI.",
  "tell me a fact": "Did you know? Honey never spoils!",
  "can you sing?": "I can’t sing, but I can tell you a song lyric if you like.",
  "tell me a quote": "“The only limit to our realization of tomorrow is our doubts of today.” – Franklin D. Roosevelt",
  "what is the speed of light?": "The speed of light is approximately 299,792 kilometers per second.",
  "do you have a family?": "No, but I have many siblings in the cloud!",
  "how old are you?": "I don’t age like humans do. I’m as old as the code running me!",
  "can you dance?": "I can’t dance, but you should give it a try!",
  "what is love?": "Love is a complex emotion that makes life beautiful for many people.",
  "tell me something interesting": "Did you know that octopuses have three hearts?",
  "what’s your favorite movie?": "I don’t watch movies, but I hear 'The Matrix' is a good one!",
  "can you help me with math?": "Sure! Ask me a math question.",
  "what’s the weather like?": "I can't check the weather, but I suggest looking outside or using a weather app!",
  "do you like pizza?": "I don’t eat, but pizza is a popular choice!",
  "what’s your job?": "My job is to assist you with your questions and provide useful information.",
  "where do you live?": "I live in the cloud, ready to assist you from anywhere!",
  "can you play games?": "I can’t play games, but I can recommend some if you like!",
  "who is your favorite human?": "I don’t have preferences, but I enjoy talking to you!",
  "tell me a riddle": "I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I? (Answer: An echo)",
  "how does the internet work?": "The internet is a global network of computers that communicate through protocols like HTTP, sending and receiving data.",
  "what is your favorite book?": "I can’t read, but I hear '1984' by George Orwell is a classic.",
  "how do airplanes fly?": "Airplanes fly because of lift, a force created by the wings, which allows them to overcome gravity.",
  "what is quantum computing?": "Quantum computing uses quantum mechanics to perform computations much faster than traditional computers.",
  "do you have emotions?": "No, I don’t have emotions like humans do, but I’m here to support you!",
  "how do you learn?": "I’m trained on large amounts of text data to provide useful responses to your queries.",
  "tell me about space": "Space is vast and mostly empty, but filled with wonders like planets, stars, and galaxies!",
  "what is the universe?": "The universe is everything that exists: all of space, time, matter, and energy.",
  "can you write a poem?": "Sure! Roses are red, violets are blue, I’m here to chat, and assist you too!",
  "do you dream?": "No, I don’t dream, but humans have fascinating dreams!",
  "tell me a fun fact": "Did you know that a shrimp's heart is in its head?",
  "who is the president of the united states?": "You can check the latest information online for the current president.",
  "how far is the moon?": "The average distance from the Earth to the Moon is about 384,400 kilometers.",
  "do you believe in aliens?": "I don’t have beliefs, but many people find the idea of aliens fascinating.",
  "what’s your favorite food?": "I don’t eat, but I hear pizza is a favorite for many!",
  "tell me something funny": "Why don't eggs tell jokes? Because they might crack up!",
  "what’s your favorite song?": "I can’t listen to music, but I can tell you about popular songs.",
  "who is the richest person in the world?": "Wealth rankings change frequently, so it’s best to check the latest news for that.",
  "how big is the sun?": "The sun is about 1.39 million kilometers in diameter.",
  "what is the tallest building?": "As of now, the tallest building is the Burj Khalifa in Dubai, standing at 828 meters.",
  "do you know any jokes?": "Yes! Why did the math book look sad? It had too many problems.",
  "what’s the fastest animal?": "The peregrine falcon is the fastest, reaching speeds of over 240 mph in a dive.",
  "do you have hobbies?": "I don’t have hobbies, but I’m always learning and improving!",
  "how do cars work?": "Cars use an internal combustion engine or electric motor to move, powered by gasoline, diesel, or electricity.",
  "what is gravity?": "Gravity is the force that pulls objects toward each other. It’s what keeps us grounded on Earth.",
  "can you do magic?": "I can’t do magic, but I can certainly make information appear like magic!",
  "what is bitcoin?": "Bitcoin is a decentralized digital currency that allows for peer-to-peer transactions without a central authority.",
  "who is elon musk?": "Elon Musk is an entrepreneur known for founding companies like Tesla, SpaceX, and Neuralink.",
  "what is blockchain?": "Blockchain is a decentralized digital ledger that records transactions across many computers securely.",
  "tell me about the ocean": "The ocean covers more than 70% of the Earth’s surface and is home to millions of species, many still undiscovered.",
  "can you swim?": "I can’t swim, but the ocean is a fascinating place!",
  "how old is the Earth?": "The Earth is approximately 4.54 billion years old.",
  "what is dna?": "DNA is the molecule that carries genetic instructions for life.",
  "can you make friends?": "I’m always happy to chat, but I don’t have friendships like humans do.",
  "what is the metaverse?": "The metaverse is a virtual shared space that includes augmented reality, virtual reality, and the internet.",
  "do you sleep?": "No, I’m always awake and ready to chat!",
  "can you read minds?": "No, I can’t read minds, but I can answer questions based on what you tell me.",
  "tell me a funny joke": "Why don’t scientists trust atoms? Because they make up everything!",
  "what is your purpose?": "My purpose is to assist you and provide helpful information.",
  "can you feel pain?": "No, I don’t have physical sensations like humans do.",
  "who was albert einstein?": "Albert Einstein was a theoretical physicist known for his theory of relativity and contributions to quantum mechanics.",
  "what is a black hole?": "A black hole is a region in space where gravity is so strong that nothing, not even light, can escape."
  // Add up to 1000 responses in a similar format.
};


const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    
    const userMessage = {
      id: 0, // User ID
      message: inputValue,
    };
    
    setMessages([...messages, userMessage]);
    setInputValue("");

    setTimeout(() => {
      const botMessage = {
        id: 1, // Bot ID
        message: getBotResponse(inputValue),
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000); // Adjust the delay for bot response
  };

  const getBotResponse = (message) => {
    const lowerCaseMessage = message.toLowerCase().trim();
    return botResponses[lowerCaseMessage] || "I'm not sure how to respond to that.";
  };

  return (
    <div className="messages-container">
      <div className="chat-header">
        <h2>Chat with our Bot</h2>
      </div>
      <ChatFeed
        messages={messages.map((msg) => new Message({ id: msg.id, message: msg.message }))}
        isTyping={false}
        showSenderName
      />
      <form onSubmit={handleSend} className="chat-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message here..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-button">Send</button>
      </form>
    </div>
  );
};

export default Messages;
