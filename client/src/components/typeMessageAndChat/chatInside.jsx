import { Msg } from "./userAndGptMsg";
import { MsgUser } from "./userAndGptMsg";
import TypeMessage from "./typeMessage";
import Header from "../allChatsAndUpload/header";
import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../allChatsAndUpload/LoadingOverlay";
//import { useLocation } from "react-router-dom";

export default function ChatInside() {
  const [loaded, setLoaded] = useState(true);
  const bottomRef = useRef(null);

  const [text, setText] = useState("");
  const [allChats, setAllChats] = useState([]);

  // const location = useLocation();
  //const msgOption = location.state?.message;

  const { id } = useParams();
  console.log(`this is our ${id}`);

  const handleSend = async (chatId) => {
    if (!text.trim()) return;

    // 1. Добавляем сообщение сразу в allChats
    const newMessage = {
      message: text,
      role: "User", // или как у тебя помечаются авторы сообщений
    };

    setAllChats((prev) => [...prev, newMessage]);
    setText(""); // очищаем input

    // 2. Отправляем сообщение на сервер
    try {
      setLoaded(false);
      await fetch(`${import.meta.env.VITE_HOST}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth_token: window.Telegram?.WebApp.initData,
        },
        body: JSON.stringify({ message: text, chatId: chatId, role: "User" }),
      });
      await fetchShortMessages();
      setLoaded(true);
    } catch (error) {
      console.error("Ошибка отправки:", error);
      // тут можно обновить состояние с ошибкой или показать уведомление
    }
  };

  const fetchShortMessages = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_HOST}/shortMessages?` +
          new URLSearchParams({
            chatId: id,
          }).toString(),
        {
          headers: {
            auth_token: window.Telegram?.WebApp.initData,
          },

          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(data);
      setAllChats(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchShortMessages();
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [text, allChats]);

  return (
    <div class=" bg-slate-700 mt-20">
      {!loaded ? (
        <LoadingOverlay text="Please wait for response. It can last up to 30 secs." />
      ) : (
        ""
      )}
      <Header />
      <div class="flex flex-col  m-5  bg-slate-700 pt-7 gap-5 pb-35">
        {allChats.map((chat) => {
          if (chat.role === "User") {
            return <MsgUser chat={chat} />;
          } else {
            return <Msg chat={chat} />;
          }
        })}
        <div ref={bottomRef} />
      </div>

      <TypeMessage
        setText={setText}
        handleSend={handleSend}
        id={id}
        text={text}
      />
    </div>
  );
}
