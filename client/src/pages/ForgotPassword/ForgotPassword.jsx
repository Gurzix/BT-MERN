import "./forgotPassword.scss";
import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [mail, setMail] = useState("");
  const [msg, setMsg] = useState(false);
  const [errorHandler, setErrorHandler] = useState("");
  const handleResetButton = async (e) => {
    e.preventDefault();
    if (msg) {
      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/forgot-password",
          {
            email: mail,
          }
        );
      } catch (err) {
        console.log(err);
      }
    } else {
    }
  };

  return (
    <div className="resetPassword">
      <h1>Reset hasła</h1>
      <form className="resetForm" onSubmit={handleResetButton}>
        <label>Podaj email:</label>
        <input
          className="resetInput"
          type="text"
          placeholder="Podaj swój email.."
          onChange={(e) => setMail(e.target.value)}
        />

        {isFetching ? (
          <p>Loading...</p>
        ) : (
          <button
            onClick={(e) => {
              mail ? setMsg(true) : setErrorHandler("Musisz podać email..");
            }}
            className="resetButton"
          >
            Reset
          </button>
        )}
      </form>
      {msg ? (
        <p className="linkSent">Link do zmiany hasła został wysłany</p>
      ) : (
        <p style={{ color: "crimson", marginTop: "10px" }}>{errorHandler}</p>
      )}
    </div>
  );
};

export default ForgotPassword;
