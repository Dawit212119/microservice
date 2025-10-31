import { useState } from "react";
import axios from "axios";
export default function signup() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const onsubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post("/api/users/signup", {
        email,
        password,
      });
      console.log(response.data);
      console.log(response.data.errors);
    } catch (err) {
      console.log(err.response.data.errors[0].message);
    }
  };
  return (
    <form onSubmit={onsubmit}>
      {" "}
      <div className="form-group">
        <label htmlFor="email">
          Email
          <input
            id="email"
            className="form-control"
            type="text"
            placeholder="test@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
        </label>
      </div>
      <div className="form-group">
        <label>
          password
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </label>
      </div>{" "}
      <button>Submit</button>
    </form>
  );
}
