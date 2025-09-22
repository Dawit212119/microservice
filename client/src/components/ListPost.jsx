import React, { useEffect, useState } from "react";
import axios from "axios";
const ListPost = () => {
  const [posts, setPosts] = useState({});
  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3000/posts");
      setPosts(res.data.posts);
      console.log(res.data.posts);
    };
    fetchPosts();
  }, []);
  return (
    <div>
      ListPost
      {JSON.stringify(posts)};ghvhgvy
      {Object.values(posts).map((post) => post.title)}
    </div>
  );
};

export default ListPost;
