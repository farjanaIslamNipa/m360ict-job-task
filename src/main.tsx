import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.ts";
import { Toaster } from "sonner";
import { ConfigProvider } from "antd";
import {PersistGate} from "redux-persist/integration/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimaryBorderHover: "#391085",
                colorPrimaryHover: "#391085",
                colorPrimary: "#391085",
              },
            },
          }}
        >
          <App />
        </ConfigProvider>
      </PersistGate>
      <Toaster richColors />
    </Provider>
  </React.StrictMode>
);
