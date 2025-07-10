import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";
import ToastProvider from "./components/UI/Toast.tsx";
import { store } from "./store/store.ts";
import router from "./routes.tsx";
import "@/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastProvider/>
    </Provider>
  </StrictMode>
);
