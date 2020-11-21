import Comment from "../Comment";
import NewComment from "../NewComment";

import { USER_KEY } from "../../utils/constants";

import "./style.css";

function Comments({ post }) {
  const loggedUsername = localStorage.getItem(USER_KEY);

  return (
    <div>
      <NewComment postID={post.id} />
      {post.comments.map((c) => (
        <Comment
          key={c.id}
          postID={post.id}
          commentID={c.id}
          loggedUsername={loggedUsername}
          postOwnerUsername={post.username}
          commentOwnerUsername={c.username}
          createdAt={c.createdAt}
          body={c.body}
        />
      ))}
    </div>
  );
}

export default Comments;
