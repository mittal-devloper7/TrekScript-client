import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Ensure these paths match your project structure
import SignupBg from "../../assets/images/Signup.jpeg";
import PasswordInput from "../../components/Input/PasswordInput";
import { validEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    // Client-side Input Validation
    let validationErrors = {};
    if (!validEmail(email)) {
      validationErrors.email = "Please enter a valid email address.";
    }
    if (!password) {
      validationErrors.password = "Please enter your password.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);

    // Login API Call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home");
      }
    } catch (error) {
      // Map backend validation messages to specific UI fields
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        const backendMessage = error.response.data.message;

        if (backendMessage.toLowerCase().includes("email")) {
          setErrors({ email: backendMessage });
        } else if (backendMessage.toLowerCase().includes("password")) {
          setErrors({ password: backendMessage });
        } else {
          setErrors({ general: backendMessage }); // Fallback for "All Fields are Required"
        }
      } else {
        setErrors({
          general: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-8 relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[30rem] h-[30rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      <div className="absolute top-[20%] left-[40%] w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>

      <div className="relative z-10 w-full max-w-7xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row lg:h-[90vh]">
        {/* Left Side */}
        <div
          className="relative bg-cover bg-center w-full h-64 sm:h-80 lg:h-auto lg:w-[55%]"
          style={{ backgroundImage: `url(${SignupBg})` }}
        >
          <div className="absolute inset-0 bg-black/35"></div>
          <div className="relative z-10 h-full flex items-end p-6 sm:p-10 lg:p-12">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-white leading-tight mb-2">
                Capture Your <br className="hidden sm:block" /> Journey
              </h1>
              <p className="text-white/90 text-sm sm:text-base lg:text-lg mt-2 lg:mt-5 max-w-lg leading-relaxed lg:leading-8">
                Record your travel experiences, share your stories, and inspire
                others to explore the world through your eyes.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="w-full lg:w-[45%] flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-white">
          <form className="w-full max-w-md" onSubmit={handleLogin}>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-2 lg:mt-3 mb-6 lg:mb-10 text-sm sm:text-base">
              Login to continue your adventure
            </p>

            {/* Email Input */}
            <div className="mb-4 lg:mb-5">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
                placeholder="Enter your email"
                className={`w-full p-3 lg:p-4 text-sm sm:text-base border rounded-xl outline-none transition-all ${
                  errors.email
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-2 focus:ring-cyan-500"
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>
              )}
            </div>

            {/* Password Input Component */}
            <div className="mb-4 lg:mb-5">
              <PasswordInput
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: null });
                }}
                placeholder="Enter your password"
                className={
                  errors.password ? "border-red-500 focus:ring-red-500" : ""
                }
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* General Error Message */}
            {errors.general && (
              <p className="text-red-500 text-sm mt-2 mb-4 font-medium text-center">
                {errors.general}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full text-white font-semibold p-3 lg:p-4 mt-2 rounded-xl transition duration-300 shadow-lg ${
                isLoading
                  ? "bg-cyan-400 cursor-not-allowed"
                  : "bg-cyan-500 hover:bg-cyan-600"
              }`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>

            <p className="text-center text-gray-500 mt-6 lg:mt-8 text-sm sm:text-base">
              Don&apos;t have an account?
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="ml-2 text-cyan-600 font-semibold hover:underline transition-all"
              >
                Create Account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
