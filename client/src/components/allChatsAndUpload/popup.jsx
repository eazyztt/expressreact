import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";

const Popup = ({
  setOpen,
  options,
  setMsgOption,
  chatId,
  msgOption,
  isOpen,
}) => {
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  async function chooseMsgOption(msgOption, chatId) {
    try {
      await fetch(`${import.meta.env.VITE_HOST}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth_token: window.Telegram?.WebApp.initData,
        },
        body: JSON.stringify({
          message: msgOption,
          chatId: chatId,
          role: "GPT",
        }),
      });
    } catch (error) {
      console.error("Ошибка отправки:", error);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Затенённый блюр фон */}
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm pointer-events-none" />

      {/* Контент попапа */}
      <div className="relative z-10 bg-white rounded-2xl p-9 shadow-xl max-w-md w-[90dvw]">
        <h2 className="text-lg font-semibold pl-1">
          Нажми на вариант ответа который понравился больше всего!
        </h2>
        <div className="flex flex-col gap-4 mt-4 text-md text-gray-800">
          {options.map((el, index) => (
            <button
              key={index}
              onClick={async () => {
                setMsgOption(el);
                {
                  load ? <LoadingOverlay /> : "";
                }
                setLoad(true);
                await chooseMsgOption(el, chatId);
                setLoad(false);
                navigate(`/chat/${chatId}`, { state: { msgOption } });
                setOpen(false);
              }}
              class="bg-sky-400 rounded-3xl p-3 text-start active:bg-sky-600"
            >
              {el}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Popup;
