import { Loader2 } from "lucide-react";

export default function LoadingOverlay({ text }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col gap-5 items-center justify-center bg-black/40 backdrop-blur-sm pointer-events-auto">
      <Loader2 className="h-12 w-12 animate-spin text-white" />
      <p class="text-white mx-7">{text}</p>
    </div>
  );
}
