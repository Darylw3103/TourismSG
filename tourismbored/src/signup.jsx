import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import tekongxd from "./assets/tekongxd.jpg"
import login from "./login"

export default function Signup() {
    const navigate = useNavigate()
    
    const [formData, setFormData] = useState ({
        email: "",
        password: "",
        confirmPassword: "",
        name: ""
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        
        const {email, password, confirmPassword, name} = formData

        if (!email || !password || !confirmPassword || !name) {
            alert("Please fill in all fields")
            return
        }

        if (password !== confirmPassword) {
            alert("Password do not match.")
            return
        }

        try{
            const res = await fetch("http://localhost:5000/api/auth/signup",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password, name}),
            })
            const data = await res.json()
            if (!res.ok){
                alert(data.error || "Failed to sign up")
            } else{
                alert("Account created! Redirecting to login...")
                navigate("/login")
            }
        } catch (error) {
            console.error("Signup error:",error)
            alert("Something went wrrong. Please try again.")
        }
    }

  return(
    <div className="min-h-screen flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 h-64 md:h-auto">
        <img
            src={tekongxd}
            alt="Sign up"
            className="w-full h-full object-cover"
            />
        </div>
    { /* Form Section */}
    <div className="md:w-1/2 flex items-center justify-center bg-indigo-100 px-8 py-12">
        <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-md"
        >
            <h2 className="text-3x1 font-bold text-indigo-800 text-center">
                Create an Account
            </h2>
            {/* Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>
                <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            {/* Email */}
            <div>
                <label className = "block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>
                <input
                type = "email"
                name = "email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
            </div>
            {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-sm text-indigo-500"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-sm text-indigo-500"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-700 text-white rounded-lg font-semibold hover:bg-indigo-600 transition"
          >
            Sign Up
          </button>

          {/* Already have an account */}
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-700 font-medium hover:underline cursor-pointer"
            >
              Log in here
            </span>
          </p>
        </form>
      </div>
    </div>
  )
}
