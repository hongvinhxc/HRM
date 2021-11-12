import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { AuthContext } from "./context";
import Login from "./views/Login";
import AdminLayout from "./layouts/Admin.js";
import "antd/dist/antd.css";
import "./index.css";

function App() {
  let token = getToken();
  const [isAuth, setAuth] = useState(token != null);

  function onLogin() {
    setAuth(true);
    if (window.location.pathname != "/login") {
      window.location.reload();
    } else {
      window.location.replace("/");
    }
  }

  function onLogout() {
    localStorage.removeItem("token");
    setAuth(false);
  }

  function getToken() {
    let token = localStorage.getItem("token");
    if (!token && window.location.pathname != "/login") {
      window.location.replace("/login");
    }
    return token;
  }

  return (
    <Router>
      <AuthContext.Provider value={{ isAuth, onLogin, onLogout }}>
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
          <Redirect from="/" to="/admin/role-management" />
        </Switch>
      </AuthContext.Provider>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
