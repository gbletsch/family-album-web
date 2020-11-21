import { useState } from "react";

import axios from "../../axios";
import history from "../../history";

import "./style.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("senha não está confirmando");
      return;
    }

    const data = new FormData();
    data.append("username", username);
    data.append("password", password);
    data.append("confirmPassword", confirmPassword);
    data.append("file", file);

    axios
      .post("/register", data)
      .then(() => history.push("/login"))
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
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleFile = (event) => {
    event.preventDefault();
    const newFile = event.target.files[0];

    if (newFile.size > 2 * 1024 * 1024) {
      alert("A imagem deve ser menor do que 2 mb.");
      setFile(null);
      event.target.value = "";
      return;
    }

    setFile(newFile);
    let reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(newFile);
  };

  return (
    <div className="login-container">
      <h2>Novo usuário</h2>
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
          placeholder="escolha um nome de usuário"
          required
        />
        <label className="login__labels" htmlFor="file">
          Imagem
        </label>
        <div className="register___input-file">
          <input
            className="login__inputs"
            id="file"
            type="file"
            name="file"
            onChange={handleFile}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="avatar"
              className="register__image-preview"
            />
          )}
        </div>

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
        <label className="login__labels" htmlFor="password">
          Confirme a senha
        </label>
        <input
          value={confirmPassword}
          onChange={handleChange}
          className="login__inputs"
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="confirme sua senha"
          required
        />
        <button type="submit" className="button">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default Register;
