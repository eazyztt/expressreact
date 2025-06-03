export function Msg({ chat }) {
  return (
    <div class="flex max-w-70 min-w-50 bg-cyan-500 p-4 rounded-2xl shadow-lg  self-start">
      <p>{chat.message}</p>
    </div>
  );
}

export function MsgUser({ chat }) {
  return (
    <div class="flex max-w-70 min-w-50 bg-sky-500 p-4 rounded-2xl shadow-lg self-end">
      <p class="text-white break-words w-full">{chat.message}</p>
    </div>
  );
}
