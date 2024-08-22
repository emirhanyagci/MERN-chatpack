import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "@/stores/store.ts";
import { Provider } from "react-redux";
import { SocketContextProvider } from "./Context/SocketContext.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SocketContextProvider>
          <App />
        </SocketContextProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
