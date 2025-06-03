import { useRef, useEffect } from "react";
import Arrow from "../svgRepos/arrow";

export default function TypeMessage({ text, setText, handleSend, id }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "55px"; // сброс высоты
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // установка нужной
    }
  }, [text]);

  return (
    <div className="flex flex-row bg-gray-800 items-center self-center fixed bottom-0 w-full px-5 py-3">
      <textarea
        ref={textareaRef}
        className="resize-none overflow-hidden px-5 py-2 bg-gray-900 text-white rounded-full w-full mr-3 focus:outline-none"
        placeholder="Введите текст"
        value={text}
        rows={1}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        className="bg-sky-500 size-12 rounded-full p-2"
        onClick={async () => {
          await handleSend(id);
        }}
      >
        <Arrow />
      </button>
    </div>
  );
}
