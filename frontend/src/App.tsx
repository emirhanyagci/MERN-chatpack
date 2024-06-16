import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import Home from "@/pages/Home";
import ChatWindow from "@/features/chat/ChatWindow";
import ChatWindowPlaceholder from "@/features/chat/ChatWindowPlaceholder";
import { ThemeProvider } from "@/Context/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/login"></Route>
        <Route path="/signup"></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />}>
            <Route index element={<ChatWindowPlaceholder />}></Route>
            <Route path=":chatId" element={<ChatWindow />}></Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
