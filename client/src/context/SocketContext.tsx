import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Socket } from "socket.io-client";

interface ISocketContext {
  socket: Socket | null;
  setSocket: Dispatch<SetStateAction<Socket | null>>;
}

export const SocketContext = createContext<ISocketContext | undefined>(
  undefined
);

function SocketProvider({ children }: { children: ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);

  const value = { socket, setSocket };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}

export default SocketProvider;

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocketContext must be used within a SocketProvider.");
  }

  return context;
};
