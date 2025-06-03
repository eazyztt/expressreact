import { useNavigate } from "react-router-dom";
import Settings from "../svgRepos/settings";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div class="flex items-start bg-slate-700 w-dvw h-25 fixed top-0 justify-between">
      <h1 class="font-bold text-gray-200 text-4xl pl-5 pt-8">All chats</h1>
      <button
        class="p-3  mt-5 mr-4 rounded-full text-white active:bg-cyan-700 "
        onClick={() => {
          navigate("/");
        }}
      >
        <Settings />
      </button>
    </div>
  );
}
