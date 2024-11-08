import ReactDOM from "react-dom/client";
import "index.css";
import { Provider } from "react-redux";
import store from "store/store";
import { BrowserRouter } from "react-router-dom";
import SocketProvider from "context/SocketContext";
import App from "App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <SocketProvider>
        <App />
      </SocketProvider>
    </BrowserRouter>
  </Provider>
);
