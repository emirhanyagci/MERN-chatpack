import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import Home from "@/pages/Home";
import ChatWindow from "@/features/chat/ChatWindow";
import ChatWindowPlaceholder from "@/features/chat/ChatWindowPlaceholder";
import { ThemeProvider } from "@/Context/ThemeProvider";
import SideBar from "./components/SideBar";
import { useMediaQuery } from "react-responsive";
import SettingsWindow from "@/features/user/SettingsWindow";
import PrivacyWindow from "@/features/user/PrivacyWindow";
import Auth from "@/pages/Auth";
function App() {
  const isMin768px = useMediaQuery({ query: "(min-width: 768px)" });

  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Auth />}></Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />}>
            {!isMin768px ? <Route index element={<SideBar />}></Route> : null}

            <Route index element={<ChatWindowPlaceholder />}></Route>

            <Route path="settings" element={<SettingsWindow />}></Route>
            <Route path="privacy" element={<PrivacyWindow />}></Route>
            <Route path=":chatId" element={<ChatWindow />}></Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
