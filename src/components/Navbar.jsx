import { useNavigate } from "react-router-dom"; // FIXED: lowercase 'import'

// Adjust the path and file extension if necessary.
import Logo from "../assets/images/logo.png";
import { getInitials } from "../utils/helper";
import SearchBar from "./Input/SearchBar";

const Navbar = ({
  userInfo,
  searchQuery,
  setSearchQuery,
  onSearchNote,
  handleClearSearch,
}) => {
  const navigate = useNavigate();
  const isToken = localStorage.getItem("token");

  const onLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    handleClearSearch();
  };

  return (
    <div className="bg-white flex flex-wrap items-center justify-between px-4 sm:px-6 py-3 sm:py-4 shadow-sm sticky top-0 z-50 gap-y-4">
      {/* Left Side: Logo Image */}
      <img
        src={Logo}
        alt="TrekScript Logo"
        onClick={() => navigate("/home")}
        // Responsive heights: smaller on mobile, larger on desktop
        className="h-10 sm:h-12 md:h-16 w-auto cursor-pointer object-contain"
      />

      {/* Right Side: SearchBar & Profile */}
      {isToken && userInfo && (
        <>
          {/* 
            SEARCH BAR:
            On mobile: 'order-3 w-full' forces it to a new row below the logo/profile.
            On desktop: 'md:order-2 md:w-auto' puts it back in the middle row. 
          */}
          <div className="order-3 md:order-2 w-full md:w-auto flex justify-center">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </div>

          {/* 
            PROFILE & LOGOUT:
            On mobile: 'order-2' keeps it at the top right opposite the logo.
            On desktop: 'md:order-3' keeps it on the far right.
          */}
          <div className="order-2 md:order-3 flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center rounded-full text-cyan-700 bg-cyan-100 font-bold text-sm sm:text-base border border-cyan-200">
              {getInitials(userInfo.username)}
            </div>

            <div className="flex flex-col items-start">
              <p className="text-sm font-medium text-gray-800">
                {userInfo.username}
              </p>
              <button
                onClick={onLogout}
                className="text-xs text-slate-500 hover:text-rose-500 transition-colors font-medium mt-0.5"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
