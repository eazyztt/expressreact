import { Link } from "react-router-dom";

function formatTime(date) {
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, "0");
  const minutes = d.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default function ChatCard({ name, msg, chatId, time }) {
  return (
    <div>
      <Link
        to={`/chat/${chatId}`}
        class="flex flex-row hover:active:bg-gray-100 items-center bg-slate-700 p-3 "
      >
        <label class="p-10 border-1 border-black rounded-full bg-slate-800"></label>
        <div class="flex flex-col items-start pl-2">
          <div class="flex flex-row w-dvw justify-between">
            <div class="flex flex-col items-start">
              <p class="font-semibold text-gray-300">{name}</p>
              <p class="font-light text-gray-300">
                Last message will apear here
              </p>
            </div>
            <p class="pr-35 text-gray-300 font-medium">{formatTime(time)}</p>
          </div>
          <p class="font-light pt-3">{msg}</p>
        </div>
      </Link>
    </div>
  );
}
