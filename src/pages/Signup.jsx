

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Auth.css"
import bcrypt from 'bcryptjs';
import { loginAPI, registerAPI } from "../services/allApi";


const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()
  const encrypt = (password) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    // Create new user object
    const newUser = {
      username: formData.name,
      email: formData.email,
      password: encrypt(formData.password)

    }  

    const response = await registerAPI(newUser);
    if (response.status !== 200) {
      setError("Failed to create account. Please try again.")
      return;
    }

    // Attempt signup

    
    if (response.status === 200) {
      navigate("/")
    } else {
      setError("Failed to create account. Please try again.")
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create an Account</h2>
          <p>Join TaskManagement</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

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
              placeholder="Create a password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div>

          <button type="submit" className="auth-button">
            Sign Up
          </button>
        </form>

        <div className="auth-footer">
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
          <Link to="/" className="back-link">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="auth-info">
        <h2>Get Started with Smarter Task Management 🚀</h2>
        <p>Create Your Account, Organize Your Life</p>
        <ul className="benefits-list">
          <li>One account. Endless productivity.</li>
          <li>Plan, track, and achieve your goals with ease.</li>
          <li>Your personal productivity hub starts here.</li>
          <li>Because every task deserves attention.</li>
          <li>Sign up and take control of your day.</li>
        </ul>
      </div>
    </div>
  )
}

export default Signup

