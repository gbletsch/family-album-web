import Article from "../Article";
import Comments from "../Comments";
import ShowLikes from "../ShowLikes";

import "./style.css";

function SinglePost(props) {
  const { post } = props.location.state;
  return (
    <div className="main-container">
      <Article post={post} />
      {post.likes.length > 0 && <ShowLikes likes={post.likes} />}
      <Comments post={post} />
    </div>
  );
}

export default SinglePost;
