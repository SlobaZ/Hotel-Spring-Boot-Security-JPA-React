import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import {UserProvider} from './services/UserContext.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HashRouter>
    <UserProvider>
        <App />
    </UserProvider>
  </HashRouter>
  );
serviceWorker.unregister();


