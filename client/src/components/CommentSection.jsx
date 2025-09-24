import React, { useEffect, useState } from "react";
import axios from "axios";
const CommentSection = (postid) => {
  const [comment, setComment] = useState([]);
  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`http:localhost:3001/get/${postid}/comments`);
      setComment(res.data);
    };
    fetchComments();
  }, []);
  return (
    <div>
      {comment.map((com) => (
        <p>{com.message}</p>
      ))}
    </div>
  );
};

export default CommentSection;
