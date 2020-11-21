import { useEffect, useState } from "react";

import axios from "../../axios";
import { TOKEN_KEY, USER_AVATAR_KEY, USER_KEY } from "../../utils/constants";
import history from "../../history";

import "./style.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    localStorage.clear();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("/login", { username, password })
      .then(
        ({
          data: {
            token,
            user: { username, avatar },
          },
        }) => {
          localStorage.setItem(TOKEN_KEY, token);
          localStorage.setItem(USER_AVATAR_KEY, avatar.toString());
          localStorage.setItem(USER_KEY, username);
          history.push("/");
        }
      )
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "username":
        setUsername(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label className="login__labels" htmlFor="username">
          Username
        </label>
        <input
          value={username}
          onChange={handleChange}
          className="login__inputs"
          type="text"
          id="username"
          name="username"
          placeholder="digite seu username"
          required
        />
        <label className="login__labels" htmlFor="password">
          Senha
        </label>
        <input
          value={password}
          onChange={handleChange}
          className="login__inputs"
          type="password"
          name="password"
          id="password"
          placeholder="digite sua senha"
          required
        />
        <button type="submit" className="button">
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
