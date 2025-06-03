import React from "react";
import { useNavigate } from "react-router-dom";

const Popup = ({ setOpen, options, setMsgOption, chatId, msgOption }) => {
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
      <div className="relative z-10 bg-white rounded-2xl p-9 shadow-xl max-w-md w-full">
        <h2 className="text-lg font-semibold pl-1">
          Нажми на вариант ответа который понравился больше всего!
        </h2>
        <div className="flex flex-col gap-4 mt-4 text-md text-gray-800">
          {options.map((el, index) => (
            <button
              key={index}
              onClick={async () => {
                setMsgOption(el);
                navigate(`/chat/${chatId}`, { state: { msgOption } });
                setOpen(false);
                await chooseMsgOption(el, chatId);
              }}
              class="bg-sky-400 rounded-3xl p-2 text-start active:bg-sky-600"
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
