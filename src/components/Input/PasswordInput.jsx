import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const PasswordInput = ({ value, onChange, placeholder, className }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  // If an error class is passed down from the parent, use it.
  // Otherwise, default to standard gray borders and cyan focus.
  const defaultClasses = className
    ? className
    : "border-gray-300 focus:ring-2 focus:ring-cyan-500";

  return (
    <div className="relative w-full">
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Password"}
        type={isShowPassword ? "text" : "password"}
        className={`w-full p-3 lg:p-4 pr-12 text-sm sm:text-base border rounded-xl outline-none transition-all ${defaultClasses}`}
      />

      <button
        type="button"
        onClick={toggleShowPassword}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-500 transition-colors focus:outline-none flex items-center justify-center"
        aria-label={isShowPassword ? "Hide password" : "Show password"}
      >
        {isShowPassword ? (
          <FaRegEye className="w-5 h-5 sm:w-6 sm:h-6" />
        ) : (
          <FaRegEyeSlash className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>
    </div>
  );
};

export default PasswordInput;
