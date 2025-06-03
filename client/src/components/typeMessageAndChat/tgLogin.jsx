// components/TelegramLogin.js
export default function PreamblePage() {
  return (
    <div class="h-dvh">
      <p class="text-5xl text-sky-800 font-bold text-shadow-lg m-5 bg-sky-500 p-5">
        FlirtTech©
      </p>

      <div class="flex flex-col items-center gap-7 mt-20">
        <p class="text-3xl text-sky-500 font-bold text-shadow-lg self-start ml-13">
          Preamble
        </p>
        <p class="text-gray-200 text-lg mx-13">
          This app was created to make acquaintance much easier and{" "}
          <span class="font-bold text-sky-500">successfull</span>.
        </p>
        <p class="text-gray-200 text-lg mx-13">
          All you need is to upload interlocutor profile and click start. Our
          app will analyze it and send you{" "}
          <span class="font-bold text-sky-500">three best messages</span> to
          start conversation. Of course we will help later too. All you need is
          just to send companion message and we will analyze history of your
          chat.
        </p>
        <p class="text-gray-200 text-lg mx-13">
          Open our telegram bot to authorize safe and fast then you will be able
          to <span class="font-bold text-sky-500">start!</span>
        </p>
        <a
          class="text-gray-200 p-3 bg-sky-500 rounded-full active:bg-sky-600 shadow-lg"
          href="https://t.me/dima123456_bot?start=auth"
        >
          Open bot and get link
        </a>
      </div>
    </div>
  );
}
