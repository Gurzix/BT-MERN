import "./login.scss";
import { useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const app = useSelector((state) => state.app);
  console.log(app);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      localStorage.setItem("user", res.data.username);
      window.location.replace("/");
    } catch (err) {
      setErrMsg(err.response.data);
    }
  };

  return (
    <div className="login">
      <h1>Login</h1>
      {success ? (
        <p className="successMsg" aria-live="assertive">
          Sukces!
        </p>
      ) : (
        <p
          className={errMsg ? "LoginErrmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      )}
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Nazwa użytkownika:</label>
        <input
          ref={userRef}
          className="loginInput"
          type="text"
          placeholder="Podaj swój login.."
        />
        <label>Hasło:</label>
        <input
          ref={passwordRef}
          className="loginInput"
          type="password"
          placeholder="Wpisz hasło..."
        />
        <p className="forgotPasswordP">
          <Link to="/forgot-password" className="link forgotPasswordLink">
            Zapomniałeś hasła?
          </Link>
        </p>

        <button className="loginButton">Login</button>
      </form>
    </div>
  );
};

export default Login;
