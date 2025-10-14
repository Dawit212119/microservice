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
      {/* {JSON.stringify(posts)};ghvhgvy */}
      {Object.values(posts).map((post) => (
        <div key={post.id}>
          <h1>{post.title}</h1>
          <CommentSection postid={post.id} />
        </div>
      ))}
    </div>
  );
};

export default ListPost;
