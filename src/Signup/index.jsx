import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { environment } from "../environments/environment";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    consent_spam: false,
  });
  const [invalid, setInvalid] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  function handleResponse(data) {
    // Todo: Make popup with the message of successfully registered
    console.log(data.message);

    // Navigate to login page
    navigate(`/login`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    // Signs up by making post request
    fetch(`${environment.apiUrl}auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((response) => {
      if (response.status === 200) {
        response.json().then((data) => handleResponse(data));
      } else {
        setInvalid(true);
      }
    });
  }

  return (
    <div className="signup">
      <h2>Register New User</h2>
      {invalid && <span>Email already in use</span>}
      <form onSubmit={handleSubmit} className="signup-form">
        <label>First name</label>
        <input
          type="text"
          name="firstName"
          required
          onChange={handleChange}
          value={formData.firstName}
        />
        <label>Last name</label>
        <input
          type="text"
          name="lastName"
          required
          onChange={handleChange}
          value={formData.lastName}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          required
          onChange={handleChange}
          value={formData.email}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          value={formData.password}
        />
        <label>Phone number</label>
        <input
          type="text"
          name="phone"
          required
          onChange={handleChange}
          value={formData.phone}
        />
        <label>Address</label>
        <input
          type="text"
          name="address"
          required
          onChange={handleChange}
          value={formData.address}
        />
        <label>I agree you take my data</label>
        <input
          type="checkbox"
          name="consent"
          onChange={handleChange}
          checked={formData.consent}
        />
        <button type="submit">Sign Up</button>
      </form>
      <Link to="/login" className="login-link">
        I already have a user
      </Link>
    </div>
  );
}

export default Signup;
