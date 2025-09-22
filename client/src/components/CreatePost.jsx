import React, { useState } from "react";
import axios from "axios";
const CreatePost = () => {
  const [post, setPost] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3000/posts", {
      title: post,
    });
    const data = response.data;
    console.log(data.post[3]);
  };
  console.log(post);
  return (
    <div>
      Create Post
      <form onSubmit={handleSubmit} className="form-group">
        <label htmlFor="post">
          <input
            type="text"
            id="post"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
        </label>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
