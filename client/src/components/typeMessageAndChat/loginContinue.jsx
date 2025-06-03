import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../allChatsAndUpload/LoadingOverlay";

export default function AuthPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    console.log(token);

    if (token) {
      loginWithJwt(token);
    }
  }, []);

  async function loginWithJwt(token) {
    try {
      const res = await fetch(`${import.meta.env.VITE_HOST}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth_token: window.Telegram?.WebApp.initData,
        },
        body: JSON.stringify({ token }),
        credentials: "include", // если используешь куки
      });

      const data = await res.json();

      if (data.ok) {
        console.log("Пользователь авторизован:", data.user);
        navigate("/");
        // TODO: сохранить токен в httpOnly cookie (лучше) или localStorage
      } else {
        console.error("Ошибка авторизации:", data.error);
      }
    } catch (err) {
      console.error("Ошибка сети или сервера:", err);
    }
  }
  return <LoadingOverlay />;
}
