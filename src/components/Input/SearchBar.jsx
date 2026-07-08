import { FaMagnifyingGlass } from "react-icons/fa6"; // FIXED: lowercase 'import'
import { IoMdClose } from "react-icons/io";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-full sm:w-80 flex items-center px-4 bg-slate-100 rounded-lg border border-transparent focus-within:border-cyan-400 focus-within:bg-white transition-all overflow-hidden">
      <input
        type="text"
        placeholder="Search Stories..."
        className="w-full text-sm bg-transparent py-2.5 outline-none text-slate-800 placeholder-slate-400"
        value={value}
        onChange={onChange}
        onKeyDown={(e) => {
          // ADDED: Pressing "Enter" on mobile/desktop triggers the search!
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />

      {value && (
        <IoMdClose
          className="text-xl text-slate-500 cursor-pointer hover:text-rose-500 mr-3 shrink-0 transition-colors"
          onClick={onClearSearch}
        />
      )}

      <FaMagnifyingGlass
        className="text-lg text-slate-400 cursor-pointer hover:text-cyan-500 shrink-0 transition-colors"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
