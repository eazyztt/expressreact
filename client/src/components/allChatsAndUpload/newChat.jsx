import React, { useState, useEffect } from "react";
import Header from "./header";
import UploadForm from "./uploadForm";
import LoadingOverlay from "./LoadingOverlay";
import { useNavigate } from "react-router-dom";
import Popup from "./popup";

export default function NewChat() {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [msgOption, setMsgOption] = useState("");
  const [options, setOptions] = useState([]);
  const [chatId, setChatId] = useState(-1);
  //isOpen, onClose, options, setMsgOption

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (files.length < 1) return alert("Файл не выбран");

    const formData = new FormData();
    for (const file of files) {
      formData.append("images", file); // <-- многократно под одним именем
    }
    setIsLoading(true);

    try {
      const responseFromChats = await fetch(
        `${import.meta.env.VITE_HOST}/bigChat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            auth_token: window.Telegram?.WebApp.initData,
          },
        }
      );

      const resultFromChats = await responseFromChats.json();

      setChatId(resultFromChats.id);

      formData.append("id", resultFromChats.id);

      const response = await fetch(`${import.meta.env.VITE_HOST}/upload`, {
        method: "POST",
        body: formData,
        headers: {
          auth_token: window.Telegram?.WebApp.initData,
        },
      });

      const result = await response.json();

      console.log(result);

      setOptions(result.message_options);
      setIsLoading(false);
      setOpen(true);
      console.log(options);

      setFiles([]);

      console.log("Server response:", result);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  return (
    <div class="bg-slate-700 items-center flex flex-col">
      {isOpen && options.length > 0 && (
        <Popup
          msgOption={msgOption}
          setOpen={setOpen}
          options={options}
          setMsgOption={setMsgOption}
          chatId={chatId}
          isOpen={isOpen}
        />
      )}
      <Header />
      {!isLoading ? (
        <UploadForm files={files} setFiles={setFiles} />
      ) : (
        <LoadingOverlay text="Please wait. We need up to one minute to proceed request." />
      )}
      <button
        onClick={async () => {
          await handleUpload();
        }}
        class="bg-sky-500 text-white  p-5 w-[90dvw] rounded-full active:bg-sky-600 fixed bottom-5 shadow-lg"
      >
        Submit
      </button>
    </div>
  );
}
