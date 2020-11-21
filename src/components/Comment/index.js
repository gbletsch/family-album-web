import { parseISO, formatRelative } from "date-fns";
import pt from "date-fns/locale/pt-BR";
import { FaRegTrashAlt } from "react-icons/fa";

import axios from "../../axios";
import history from "../../history";

const Comment = ({
  body,
  commentID,
  commentOwnerUsername,
  createdAt,
  loggedUsername,
  postID,
  postOwnerUsername,
}) => {
  const deleteComment = (event) => {
    event.preventDefault();
    axios
      .delete(`/comments/${postID}/${commentID}`)
      .then(({ data }) => {
        history.push({
          pathname: "/post",
          state: {
            post: data,
          },
        });
      })
      .catch((error) => console.error(error.message));
  };

  return (
    <article className="card-container">
      <section className="card__content">
        <header className="card__content__header">
          <h3>{commentOwnerUsername}</h3>
          <div className="card__content__header__right">
            <p className="card__content__header__right__p">
              {formatRelative(parseISO(createdAt), new Date(), { locale: pt })}
            </p>
            {[commentOwnerUsername, postOwnerUsername].includes(
              loggedUsername
            ) && (
              <button
                onClick={deleteComment}
                className="button card__content__header__right__btn"
              >
                <FaRegTrashAlt size={13} />
              </button>
            )}
          </div>
        </header>
        <p className="card__content__p">{body}</p>
      </section>

      {/* <section className="card__content">

         <header className="card__content__header">
          <h3>{commentOwnerUsername}</h3>
          <p className="card__content__header__p">
            {formatRelative(parseISO(createdAt), new Date(), { locale: pt })}
          </p>
          {username === loggedUser && (
              <button
                onClick={deleteComment}
                className="button card__content__header__right__btn"
              >
                <FaRegTrashAlt size={15} />
              </button>
            )}

        </header>
        <p className="card__content__p">{body}</p>
      </section> */}

      {/* <header className="card__content__header">
        <h3>{username}</h3>
        <p className="card__content__header__p">
          {formatRelative(parseISO(createdAt), new Date(), { locale: pt })}
        </p>
      </header>
      <p className="card__content__p">{body}</p> */}
    </article>
  );
};

export default Comment;
