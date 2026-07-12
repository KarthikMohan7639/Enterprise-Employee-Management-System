import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {ConfigProvider} from "antd";
import {appTheme} from "./config/theme";


import App from "./App";
import { store } from "./redux/store";

import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    <ConfigProvider theme={appTheme}>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </ConfigProvider>

);
