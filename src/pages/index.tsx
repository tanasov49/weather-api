import React from "react";
import ReactDOM from "react-dom/client";
import App from "../components/App";
import "./index.scss";
import { ModalState } from "../context/ModalContext";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <ModalState>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ModalState>
);
