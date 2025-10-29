import { useState } from "react";
import axios from "axios";

export default ({ url, method, body }) => {
  const [errors, setErrors] = useState(null);

  const doRequest = async () => {
    try {
      const response = await axios[method](url, body);
      return response.data;
    } catch (err) {
      setErrors(
        <p>
          {err.response.data.errors.map((err) => (
            <h4>{err.message}</h4>
          ))}
        </p>
      );
    }
  };

  return { doRequest, errors };
};
