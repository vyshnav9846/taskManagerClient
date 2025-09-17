

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Auth.css"
import bcrypt from 'bcryptjs';
import { loginAPI, registerAPI } from "../services/allApi";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
const encrypt = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
  const handleSubmit = async(e) => {
    e.preventDefault()
    setError("")
    

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields")
      return
    }
    const encryptedPassword = formData.password;


    // Attempt login
    const response = await loginAPI({email: formData.email, password: encryptedPassword});
    if (response.status !== 200) {
      setError("Invalid email or password")
      return;
    }
     
    if (response.status === 200) {
     sessionStorage.setItem("token", response.data.token);
      navigate("/dashboard")
    } else {
      setError("Invalid email or password")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Login to TaskManagment</h2>
          <p>Enter your credentials to access your account</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Login
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
          <Link to="/" className="back-link">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="auth-info">
        <h2>Welcome Back 👋</h2>
        <p>Log in to Stay Productive.
        </p>
        
      </div>
    </div>
  )
}

export default Login

