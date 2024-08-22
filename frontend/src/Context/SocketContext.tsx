import { selectUserSlice } from "@/features/user/userSlice";
import {
  ReactElement,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";
import { useSelector } from "react-redux";
import { io, Socket } from "socket.io-client";

interface SocketContext {
  socket: Socket | null;
}
const URL = import.meta.env.VITE_BASE_URL || "http://localhost:3000";

const SocketContext = createContext<SocketContext>({ socket: null });
export const useSocketContext = () => {
  return useContext(SocketContext);
};
export const SocketContextProvider = ({
  children,
}: {
  children: ReactElement;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const userSlice = useSelector(selectUserSlice);

  useEffect(() => {
    if (!userSlice.isAuthed) return;

    const socket = io(URL, {
      auth: {
        token: userSlice.accessToken,
      },
    });

    setSocket(socket);
    return () => {
      socket.close();
      setSocket(null);
    };
  }, [userSlice.isAuthed]);
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
