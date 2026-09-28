import { useState } from "react";
import axios from "axios";
import Popup from "../components/Popup";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          name: name,
          email: email,
          password: password,
        }
      );

      console.log(response.data);

      setPopup({
        show: true,
        message: "Signup successful!",
        type: "success",
      });
    } catch (error) {
      console.log(error);

      setPopup({
        show: true,
        message:
          error.response?.data?.message || "Signup failed!",
        type: "error",
      });
    }
  };

  const handlePopupClose = () => {
    if (popup.type === "success") {
      window.location.reload();
    }

    setPopup({
      show: false,
      message: "",
      type: "success",
    });
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        <div className="signup-top">

          <div className="signup-icon">
            
          </div>

          <h1>Beauty Salon</h1>

          
        </div>

        <div className="signup-content">

          <h2>Create Account</h2>

          <p className="signup-subtitle">
            Create your account to book your beauty appointment
          </p>

          <form onSubmit={handleSignup}>

            <label>Full Name</label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="signup-button"
            >
              CREATE ACCOUNT
            </button>

          </form>

          <p className="signup-login-text">
            Already have an account?

            <span
              onClick={() => window.location.reload()}
              className="login-link"
            >
              {" "}Login
            </span>
          </p>

        </div>

      </div>

      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={handlePopupClose}
        />
      )}

    </div>
  );
}

export default Signup;