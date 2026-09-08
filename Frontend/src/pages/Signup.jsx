import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import '../App.css'

function Signup() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    email: '',
    contact: '',
    project: '',
    department: '',
    role: 'Employee',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.')
      return
    }

    setError('')
    setSuccess('')
    setLoading(true)

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/register/',
        {
          username: formData.username,
          password: formData.password,
          name: formData.name,
          email: formData.email,
          contact: formData.contact,
          project: formData.project,
          department: formData.department,
          role: formData.role,
        }
      )

      console.log('Signup successful:', response.data)

      setSuccess('Account created successfully!')

      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        name: '',
        email: '',
        contact: '',
        project: '',
        department: '',
        role: 'Employee',
      })

    } catch (error) {
      console.log('Signup failed:', error.response?.data)

      const data = error.response?.data

      if (data) {
        const firstError = Object.values(data)[0]

        setError(
          Array.isArray(firstError)
            ? firstError[0]
            : firstError
        )
      } else {
        setError('Signup failed. Please try again.')
      }

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">

      <div className="login-card signup-card">

        {/* QMS Logo */}

        <div className="logo">
          <div className="logo-icon">Q</div>

          <div>
            <h1>QMS</h1>
            <p>Internal Audit & Compliance</p>
          </div>
        </div>


        {/* Welcome Text */}

        <div className="welcome">
          <h2>Create your account</h2>
          <p>Register to access your compliance dashboard.</p>
        </div>


        {/* Signup Form */}

        <form onSubmit={handleSubmit}>

          {/* Full Name */}

          <div className="form-group">
            <label htmlFor="name">Full Name</label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>


          {/* Username */}

          <div className="form-group">
            <label htmlFor="username">Username</label>

            <input
              id="username"
              type="text"
              name="username"
              placeholder="Choose your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>


          {/* Email */}

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>


          {/* Contact */}

          <div className="form-group">
            <label htmlFor="contact">Contact Number</label>

            <input
              id="contact"
              type="text"
              name="contact"
              placeholder="Enter your contact number"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>


          {/* Project */}

          <div className="form-group">
            <label htmlFor="project">Project</label>

            <input
              id="project"
              type="text"
              name="project"
              placeholder="Enter your project"
              value={formData.project}
              onChange={handleChange}
              required
            />
          </div>


          {/* Department */}

          <div className="form-group">
            <label htmlFor="department">Department</label>

            <input
              id="department"
              type="text"
              name="department"
              placeholder="Enter your department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>


          {/* Role */}

          <div className="form-group">
            <label htmlFor="role">Role</label>

            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Auditor">Auditor</option>
              <option value="Employee">Employee</option>
              <option value="Manager">Manager</option>
            </select>
          </div>


          {/* Password */}

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
            />
          </div>


          {/* Confirm Password */}

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>


          {/* Error */}

          {error && (
            <p className="error-message">
              {error}
            </p>
          )}


          {/* Success */}

          {success && (
            <p className="success-message">
              {success}
            </p>
          )}


          {/* Signup Button */}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

        </form>


        {/* Login Link */}

        <div className="login-footer">
          <p>
            Already have an account?{' '}

            <button
              type="button"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </p>
        </div>

      </div>


      {/* Copyright */}

      <p className="copyright">
        QMS Internal Audit & Compliance System
      </p>

    </div>
  )
}

export default Signup