  import React from "react";
  import ReactDOM from "react-dom/client";
  import { Provider } from "react-redux";
  import { store } from "./store/store";
  import App from "./App";
  import "./styles/global.css";

  document.documentElement.lang = "en-GB";

  async function enableMocking() {
    if ((import.meta.env.MODE as string) === "test") return;
    const { worker } = await import("./mocks/browser");
    await worker.start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: `${import.meta.env.BASE_URL ?? "/"}mockServiceWorker.js`,
      },
    });
  }
  
  enableMocking().then(() => {
    const rootEl = document.getElementById("root");
    if (rootEl) {
      const root = ReactDOM.createRoot(rootEl);
      root.render(
        <React.StrictMode>
          <Provider store={store}>
            <App />
          </Provider>
        </React.StrictMode>,
      );
    }
  });