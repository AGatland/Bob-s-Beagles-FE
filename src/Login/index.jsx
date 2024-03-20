import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../App";

import { environment } from "../environments/environment";

function Login() {
  const { user, login } = useContext(AuthContext);

  const [loginDetails, setLoginDetails] = useState({
    username: "",
    password: "",
  });
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  // TODO: Might structure the data from backend differently and/or add more fields to the user login details
  function handleResponse(data) {
    login(data.user, data.token)
  }

  // redirect to homepage if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  function handleSubmit(event) {
    event.preventDefault();
    // Logs in by making post request
    fetch(`${environment.devUrl}auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginDetails),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => handleResponse(data));
      } else {
        setInvalid(true);
      }
    });
  }

  return (
    <div className="login">
      <h2>Log In</h2>
      {invalid && <span>Invalid username or password</span>}
      <form onSubmit={handleSubmit} className="form">
        <label>
          Email
          <input
            type="text"
            name="username"
            required
            onChange={handleChange}
            value={loginDetails.username}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            required
            onChange={handleChange}
            value={loginDetails.password}
          />
        </label>
        <button type="submit">Log In</button>
      </form>
      <Link to="/signup">I don&apos;t have a user</Link>
    </div>
  );
}

export default Login;
