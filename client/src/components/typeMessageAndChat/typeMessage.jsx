import Arrow from "../svgRepos/arrow";

export default function TypeMessage({ text, setText, handleSend, id }) {
  return (
    <div class="flex flex-row bg-gray-800 items-center self-center fixed bottom-0 h-40">
      <textarea
        class="py-8 px-7 ml-5 mx-3 focus:outline-none w-[79dvw] bg-gray-900 text-white rounded-full"
        placeholder="Введите текст"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        class="bg-sky-500 size-12 rounded-full mr-10"
        onClick={async () => {
          await handleSend(id);
        }}
      >
        <Arrow />
      </button>
    </div>
  );
}
