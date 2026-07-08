import { FiFeather } from "react-icons/fi"; // FIXED: lowercase 'import'

const EmptyCard = ({ message }) => {
  return (
    // Added horizontal padding and responsive top margin
    <div className="flex flex-col items-center justify-center mt-12 sm:mt-20 pb-10 px-4 sm:px-0">
      {/* Icon Container with responsive sizing */}
      <div className="w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center bg-cyan-50 rounded-full mb-6 border border-cyan-100 shadow-sm transition-transform hover:scale-105 duration-300 shrink-0">
        <FiFeather className="text-[48px] sm:text-[64px] text-cyan-500" />
      </div>

      {/* Message Text with adaptive width and typography */}
      <p className="w-full sm:w-3/4 md:w-1/2 text-sm sm:text-base font-medium text-slate-500 text-center leading-relaxed">
        {message ||
          "Start creating your first Travel Story! Click the 'Add' button to jot down your memories, locations, and photos. Let's get started!"}
      </p>
    </div>
  );
};

export default EmptyCard;
