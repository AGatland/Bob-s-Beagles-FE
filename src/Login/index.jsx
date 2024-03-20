import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
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

  function handleResponse(data) {
    // Save token and id of user to local storage
    localStorage.setItem("token", data.token);
    localStorage.setItem("id", data.id);

    // Navigate to dashboad
    navigate(`/`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Logs in by making post request
    fetch(`http://localhost:4000/auth/signin`, {
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
