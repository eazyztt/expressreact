import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ChatCard from "./chatCard";
import Header from "./header";
import TelegramLogin from "../typeMessageAndChat/tgLogin";
import LoadingOverlay from "./LoadingOverlay";

export default function InutScryan() {
  const [loaded, setLoaded] = useState(false);
  const [chats, setChat] = useState([]);
  const navigate = useNavigate();

  const fetchBigChats = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/bigChats`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth_token: window.Telegram?.WebApp.initData,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setLoaded(true);
      console.log(data);
      setChat(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    //fetchJoke();
    fetchBigChats();
  }, []);

  const newChatCreation = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_HOST}/bigChat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth_token: window.Telegram?.WebApp.initData,
        },
      });

      const result = await response.json();

      console.log("Server response:", result);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  console.log("InutScryan chats:", chats);
  return (
    <>
      {!loaded ? <LoadingOverlay text="Loading..." /> : ""}
      <Header />
      <div class="mt-30">
        {chats.map((chat) => (
          <ChatCard
            key={chat.id}
            name={chat.title}
            chatId={chat.id}
            time={chat.createdAt}
          />
        ))}
      </div>

      <div class="bg-white "></div>
      <button
        class="px-11 py-9 bg-sky-500 fixed bottom-10 right-4 rounded-full font-bold text-2xl text-white active:bg-sky-600"
        onClick={async () => {
          navigate("/newChat");
        }}
      >
        +
      </button>
    </>
  );
}
