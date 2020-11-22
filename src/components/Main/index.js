import { useEffect, useState } from "react";

import Article from "../Article";
import axios from "../../axios";
import history from "../../history";
import compareValues from "../../utils/compare-values";

import "./style.css";

const Main = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/posts")
      .then(({ data }) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((error) => {
        history.push("/login");
      });
  }, []);

  if (loading) <h1>Carregando...</h1>;
  if ((posts && posts.length === 0) || !posts)
    <h1>ops... connection error...</h1>;
  return (
    <main className="main-container">
      {posts.sort(compareValues("createdAt", "desc")).map((post) => (
        <Article key={post.id} post={post} />
      ))}
    </main>
  );
};

export default Main;
