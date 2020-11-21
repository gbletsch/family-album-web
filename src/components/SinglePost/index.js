import Article from "../Article";
import Comments from "../Comments";

import "./style.css";

function SinglePost(props) {
  const { post } = props.location.state;
  return (
    <div className="main-container">
      <Article post={post} />
      <Comments post={post} />
    </div>
  );
}

export default SinglePost;
