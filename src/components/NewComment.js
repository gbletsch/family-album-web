import { useState } from "react";
import { FiSend } from "react-icons/fi";

import axios from "../axios";
import history from "../history";

function NewComment({ postID }) {
  const [body, setBody] = useState("");

  const saveComment = (event) => {
    event.preventDefault();
    axios
      .post("/comments", {
        postID,
        body,
      })
      .then(({ data }) => {
        history.push({
          pathname: "/post",
          state: {
            post: data,
          },
        });
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    switch (name) {
      case "body":
        setBody(value);
        break;
      default:
        break;
    }
  };

  return (
    <div className="card-container">
      <form onSubmit={saveComment}>
        <input
          className="input-text"
          type="text"
          id="body"
          name="body"
          value={body}
          onChange={handleChange}
          placeholder="digite comentário"
        />
        <span className="upload-btn">
          <button className="custom-file-upload" type="submit">
            <FiSend />
          </button>
        </span>
      </form>
    </div>
  );
}

export default NewComment;
