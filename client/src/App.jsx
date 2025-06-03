import React, { useState } from "react";
import "./App.css";
import ChatInside from "./components/typeMessageAndChat/chatInside";
import InutScryan from "./components/allChatsAndUpload/InutScryan";
import NewChat from "./components/allChatsAndUpload/newChat";
import { Routes, Route } from "react-router-dom";
import TelegramLogin from "./components/typeMessageAndChat/tgLogin";
import AuthPage from "./components/typeMessageAndChat/loginContinue";

function App() {
  return (
    <>
      <Routes>
        <Route path="/newChat" element={<NewChat />} />
        <Route path="/" element={<InutScryan />} />
        <Route path="/chat/:id" element={<ChatInside />} />
        <Route path="/api/auth" element={<AuthPage />} />
      </Routes>
    </>
  );
}

export default App;
