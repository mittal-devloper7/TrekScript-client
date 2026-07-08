import { useState } from "react"; // FIXED: lowercase 'import'
import { MdClose, MdAdd, MdPerson } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    const trimmedInput = inputValue.trim();

    // Check if input is not empty AND if the tag doesn't already exist
    if (trimmedInput !== "" && !tags.includes(trimmedInput)) {
      setTags([...tags, trimmedInput]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevents accidental form submission
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {/* Render Tags if they exist */}
      {tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-1.5 text-sm text-cyan-700 bg-cyan-50 border border-cyan-100 px-3 py-1.5 rounded-md font-medium"
            >
              <MdPerson className="text-sm opacity-80" /> {tag}
              <button
                type="button" // Prevents page reloads in forms
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-rose-500 hover:bg-rose-50 rounded-full p-0.5 transition-colors ml-1"
              >
                <MdClose className="text-sm" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input Field and Add Button */}
      {/* ADDED: flex-1 on the input makes it responsive to any screen width! */}
      <div className="flex items-center gap-3 mt-3">
        <input
          type="text"
          value={inputValue}
          className="flex-1 text-sm bg-transparent border border-slate-200 focus:border-cyan-400 px-3 py-2.5 rounded outline-none transition-colors"
          placeholder="Add Friends..."
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          type="button"
          className="w-10 h-10 shrink-0 flex items-center justify-center rounded border border-cyan-500 hover:bg-cyan-500 group transition-all"
          onClick={addNewTag}
        >
          <MdAdd className="text-2xl text-cyan-500 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
