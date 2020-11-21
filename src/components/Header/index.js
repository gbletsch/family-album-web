import history from "../../history";
import NewPost from "../NewPost";
import { USER_AVATAR_KEY, USER_KEY } from "../../utils/constants";

import "./style.css";

const Header = () => {
  const username = localStorage.getItem(USER_KEY);
  const avatar = localStorage.getItem(USER_AVATAR_KEY);
  const pathname = window.location.pathname;

  const handleClick = (event) => {
    const { name } = event.target;

    switch (name) {
      case "login":
        history.push("/login");
        break;
      case "register":
        history.push("/register");
        break;
      case "logout":
        localStorage.clear();
        history.push("/login");
        break;
      default:
        break;
    }
  };

  if (!username || !avatar) {
    return (
      <header className="header">
        <div className="header-container">
          <a href="/" className="logo">
            Família
          </a>
          {!["/login"].includes(pathname) && (
            <button className="button" name="login" onClick={handleClick}>
              Entrar
            </button>
          )}
          {pathname !== "/register" && (
            <button className="button" name="register" onClick={handleClick}>
              Registrar
            </button>
          )}
        </div>
        {pathname === "/" && <NewPost />}
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header-container">
        <a href="/" className="logo">
          <img src={avatar} alt={`Foto do usuário ${username}`} />
          {username}
        </a>
        <button className="button" name="logout" onClick={handleClick}>
          Sair
        </button>
      </div>
      {pathname === "/" && <NewPost />}
    </header>
  );
};

export default Header;
