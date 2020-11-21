import { addQuarters } from "date-fns";
import { useState } from "react";
import { FiPaperclip, FiSend } from "react-icons/fi";

import axios from "../../axios";
import history from "../../history";

import "./style.css";

const NewPost = () => {
  const [file, setFile] = useState("");
  const [caption, setCaption] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("caption", caption);
    data.append("file", file);

    axios
      .post("/posts", data)
      .then(() => history.push("/"))
      .catch((error) => console.error(error));
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "caption":
        setCaption(value);
        break;
      default:
        break;
    }
  };

  return (
    <footer className="footer-container">
      <form onSubmit={handleSubmit}>
        <input
          className="input-text"
          type="text"
          id="caption"
          name="caption"
          value={caption}
          onChange={handleChange}
          placeholder="digite mensagem"
        />
        <span className="upload-btn">
          <label htmlFor="file-upload" className="custom-file-upload">
            <FiPaperclip />
          </label>
          <input
            className="hidden"
            id="file-upload"
            type="file"
            name="file"
            onChange={handleFile}
          />
          <button className="custom-file-upload" type="submit">
            <FiSend />
          </button>
        </span>
      </form>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="prévia da imagem"
          className="newpost__img-preview"
        />
      )}
    </footer>
  );
};

export default NewPost;
