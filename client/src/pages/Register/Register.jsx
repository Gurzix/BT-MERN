import "./register.scss";
import { useState, useRef, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [error, setError] = useState([]);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const [subscription, setSubscription] = useState(false);
  const [user, setUser] = useState({
    username: username,
    email: email,
    password: password,
    subscription: subscription,
  });
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(username);
    setValidName(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);

    setValidPwd(result);
  }, [password]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);

    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
        subscription,
      });
      setSuccess(true);

      window.location.replace("/login");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("Błąd połączenia");
      } else if (err.response) {
        setErrMsg(err.response.data);
      } else {
        setErrMsg("Rejestracja się nie powiodła");
      }

      console.log(err);
    }
  };
  return (
    <div className="register">
      <h1>Rejestracja</h1>
      {success ? (
        <p className="successMsg" aria-live="assertive">
          Sukces! - zweryfikuj konto (link wysłany)
        </p>
      ) : (
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
      )}
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>
          Nazwa użytkownika{" "}
          <FontAwesomeIcon
            icon={faCheck}
            className={validName ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validName || !username ? "hide" : "invalid"}
          />
        </label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          ref={userRef}
          autoComplete="off"
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
          className="registerInput"
          type="text"
          placeholder="Wpisz swoją nazwę.."
        />
        <p
          id="uidnote"
          className={
            userFocus && username && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Nazwa musi mieć od 4 do 24 znaków i rozpoczynać się od litery.
        </p>
        <label>
          Email{" "}
          <FontAwesomeIcon
            icon={faCheck}
            className={validEmail ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validEmail || !email ? "hide" : "invalid"}
          />
        </label>
        <input
          onChange={(e) => setEmail(e.target.value)}
          required
          aria-invalid={validEmail ? "false" : "true"}
          aria-describedby="emailDesc"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
          className="registerInput"
          type="text"
          placeholder="Podaj email..."
        />
        <p
          id="emailDesc"
          className={
            emailFocus && email && !validEmail ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Podano niewłaściwy format
        </p>
        <label>
          Password{" "}
          <FontAwesomeIcon
            icon={faCheck}
            className={validPwd ? "valid" : "hide"}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={validPwd || !password ? "hide" : "invalid"}
          />
        </label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
          className="registerInput"
          type="password"
          placeholder="Wpisz hasło..."
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Hasło musi mieć 8-24 znaków, zawierać duże oraz małe litery oraz znaki
          specjalne:
          <span aria-label="exclamation mark">!</span>{" "}
          <span aria-label="at symbol">@</span>{" "}
          <span aria-label="hashtag">#</span>{" "}
          <span aria-label="dollar sign">$</span>{" "}
          <span aria-label="percent">%</span>
        </p>
        <button
          className="registerButton"
          type="submit"
          disabled={!validName || !validPwd || !validEmail ? true : false}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
