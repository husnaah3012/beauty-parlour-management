import { useState } from "react";
import axios from "axios";
import Signup from "./Signup";
import Popup from "../components/Popup";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.user.role);

      setPopup({
        show: true,
        message: "Login successful!",
        type: "success",
      });
    } catch (error) {
      console.log(error);

      setPopup({
        show: true,
        message:
          error.response?.data?.message || "Login failed!",
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

  if (showSignup) {
    return <Signup />;
  }

  return (
    <div className="login-page">

      {/* BEAUTY SALON HEADING */}
      <h1 className="salon-heading">
        Beauty Salon
      </h1>

      {/* LOGIN CARD */}
      <div className="login-card">

        {/* IMAGE SECTION */}
        <div className="login-image">
          <div className="image-overlay"></div>
        </div>

        {/* LOGIN CONTENT */}
        <div className="login-content">

          <h2>Welcome Back</h2>

          <p className="login-subtitle">
            Login to book your beauty appointment
          </p>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="login-button"
            >
              LOGIN
            </button>

          </form>

          <p className="or-text">
            ──────── OR ────────
          </p>

          <p className="signup-text">
            Don't have an account?{" "}

            <span
              className="signup-link"
              onClick={() => setShowSignup(true)}
            >
              Sign Up
            </span>
          </p>

        </div>
      </div>

      {/* POPUP */}
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

export default Login;