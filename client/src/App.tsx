import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store/store";
import { useSocketContext } from "context/SocketContext";
import { parseJwt } from "utils/parseJwt";
import { resetUsers } from "store/usersSlice";
import { resetChats } from "store/chatsSlice";
import SignIn from "pages/SignIn";
import SignUp from "pages/SignUp";
import Home from "pages/Home";

function App() {
  const dispatch = useDispatch();

  const { token } = useSelector((state: RootState) => state.users);

  const { socket, setSocket } = useSocketContext();

  const tokenExpirationTime = token
    ? parseJwt(token).exp * 1000 - new Date().getTime()
    : null;
  const isTokenValid = tokenExpirationTime && tokenExpirationTime > 0;

  useEffect(() => {
    if (token) {
      if (isTokenValid) {
        let timeout: number | undefined;

        timeout = window.setTimeout(() => {
          if (socket) {
            socket.emit("logout");
            setSocket(null);
          }
          localStorage.removeItem("token");
          dispatch(resetUsers());
          dispatch(resetChats());
        }, tokenExpirationTime);

        return () => {
          if (timeout !== undefined) {
            clearTimeout(timeout);
          }
        };
      } else {
        localStorage.removeItem("token");
      }
    }
  }, [token]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex justify-center items-center w-full h-full max-w-7xl max-h-[750px]">
        <Routes>
          <Route
            path="/"
            element={isTokenValid ? <Home /> : <Navigate to="/sign-in" />}
          />
          <Route
            path="/sign-in"
            element={isTokenValid ? <Navigate to="/" /> : <SignIn />}
          />
          <Route
            path="/sign-up"
            element={isTokenValid ? <Navigate to="/" /> : <SignUp />}
          />
          <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
