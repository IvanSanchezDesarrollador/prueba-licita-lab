import { createRoot } from "react-dom/client";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router";
import "@mantine/core/styles.css";
import { AppRoutes } from "./routes/AppRoutes.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.tsx";
import "@mantine/dates/styles.css";

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <BrowserRouter>
      <MantineProvider>
        <AppRoutes />
      </MantineProvider>
    </BrowserRouter>
  </Provider>
);
