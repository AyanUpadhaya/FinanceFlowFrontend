import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { NotifyContainer } from "./utils/getNotify";
import OffCanvas from "./components/ui/OffCanvas";

ReactDOM.createRoot(document.getElementById("root")).render(
 
    <Provider store={store}>
      <App />
      <OffCanvas></OffCanvas>
      <NotifyContainer></NotifyContainer>
    </Provider>
);
