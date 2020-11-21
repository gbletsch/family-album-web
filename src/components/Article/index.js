import { useState } from "react";
import { Link } from "react-router-dom";
import { FaComments, FaHeart, FaRegTrashAlt, FaRegHeart } from "react-icons/fa";
import { parseISO, formatRelative } from "date-fns";
import pt from "date-fns/locale/pt-BR";

import { USER_KEY } from "../../utils/constants";
import history from "../../history";
import axios from "../../axios";

import "./style.css";

const Article = (props) => {
  const loggedUser = localStorage.getItem(USER_KEY);
  const [post, setPost] = useState(props.post);

  function isLiked() {
    return post.likes.findIndex((l) => l.username === loggedUser) < 0
      ? false
      : true;
  }

  const [liked, setLiked] = useState(isLiked());

  const likePost = async () => {
    const { data } = await axios.post("/likes", {
      postID: post.id,
    });
    if (!data) {
      history.push("/");
    } else {
      if (liked) setLiked(false);
      else setLiked(true);
      setPost(data);
    }
  };

  const comment = () => {
    history.push({
      pathname: "/post",
      state: {
        post,
      },
    });
  };

  const deletePost = () => {
    axios
      .delete(`/posts/delete/${post.id}`)
      .then(() => history.push("/"))
      .catch((error) => console.error(error));
  };

  return (
    <article className="card-container">
      <Link
        to={{
          pathname: "/post",
          state: { post },
        }}
      >
        <img className="card__image" src={post.image[0]} alt="imagem do post" />
      </Link>

      <section className="card__content">
        <header className="card__content__header">
          <h3>{post.username}</h3>
          <div className="card__content__header__right">
            <p className="card__content__header__right__p">
              {formatRelative(parseISO(post.createdAt), new Date(), {
                locale: pt,
              })}
            </p>
            {post.username === loggedUser && (
              <button
                onClick={deletePost}
                className="button card__content__header__right__btn"
              >
                <FaRegTrashAlt size={15} />
              </button>
            )}
          </div>
        </header>
        <p className="card__content__p">{post.caption}</p>
      </section>
      <footer className="card-footer">
        <div onClick={likePost} className="like-btn">
          <button className="card-footer__btn" name="like" id="like">
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <label>{post.likes.length}</label>
        </div>

        <div className="comment-btn" onClick={comment}>
          <button
            className="card-footer__btn"
            id="comment-btn"
            name="comment-btn"
          >
            <FaComments />
          </button>
          <label htmlFor="comment-btn">{post.comments.length}</label>
        </div>
      </footer>
    </article>
  );
};

export default Article;
