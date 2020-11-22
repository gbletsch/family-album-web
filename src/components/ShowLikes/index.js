import React from "react";

function ShowLikes({ likes }) {
  return (
    <div className="likes">
      <p className="likes__p">
        {likes.length === 1 ? "Curtiu: " : "Curtiram: "}
        {likes.map((l) => `${l.username} `)}
      </p>
    </div>
  );
}

export default ShowLikes;
