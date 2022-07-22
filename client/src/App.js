import "./app.scss";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Registration from "./components/Registration";
import Home from "./components/Home";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import { useSelector } from "react-redux";

function App() {
  const { authToken } = useSelector((state) => state.auth);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={authToken ? <Home /> : <Navigate to="login" />}
            />
            <Route path="register" element={<Registration />} />
            <Route path="login" element={<Login />} />
            <Route path="forgotPassword" element={<ForgotPassword />} />
            <Route
              path="passwordreset/:resetToken"
              element={<ResetPassword />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
      <span className="copy-rights">
        By &nbsp;
        <a
          href="https://kalyan-saxena-mutyala.herokuapp.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-link"
        >
          Kalyan Saxena Mutyala
        </a>
      </span>
    </div>
  );
}

export default App;
