import moment from "moment"; // FIXED: lowercase 'import'
import {
  MdClose,
  MdDeleteOutline,
  MdUpdate,
  MdCalendarMonth,
  MdPerson,
} from "react-icons/md";

const ViewTravelStory = ({
  storyInfo,
  onClose,
  onEditClick,
  onDeleteClick,
}) => {
  if (!storyInfo) return null;

  return (
    <div className="relative pb-4">
      {/* Top Action Bar - Added flex-wrap for very small mobile screens */}
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center gap-2 flex-wrap justify-end">
          <button
            className="flex items-center gap-1.5 bg-cyan-50 text-cyan-700 px-3 py-1.5 rounded-lg hover:bg-cyan-100 transition-colors text-sm font-medium"
            onClick={onEditClick}
          >
            <MdUpdate className="text-lg" />
            Update
          </button>

          <button
            className="flex items-center gap-1.5 bg-rose-50 text-rose-700 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors text-sm font-medium"
            onClick={onDeleteClick}
          >
            <MdDeleteOutline className="text-lg" />
            Delete
          </button>

          <button
            className="ml-2 w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors shrink-0"
            onClick={onClose}
          >
            <MdClose className="text-xl" />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-6">
        {/* Title and Meta Information */}
        <div className="space-y-3">
          {/* Responsive Text: text-2xl on mobile, text-3xl on tablet/desktop */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {storyInfo.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm">
            {/* Date Badge */}
            <div className="flex items-center gap-1.5 font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-md">
              <MdCalendarMonth className="text-slate-400 text-lg" />
              {moment(storyInfo.visitedDate).format("Do MMMM YYYY")}
            </div>

            {/* Locations / Friends Tags */}
            {storyInfo.visitedLocations &&
              storyInfo.visitedLocations.length > 0 && (
                <div className="flex items-center gap-2 flex-wrap">
                  {storyInfo.visitedLocations.map((location, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1.5 text-cyan-700 bg-cyan-50 border border-cyan-100 px-3 py-1 rounded-md font-medium"
                    >
                      <MdPerson className="text-cyan-500 text-sm opacity-80" />
                      {location}
                    </span>
                  ))}
                </div>
              )}
          </div>
        </div>

        {/* Story Image with subtle hover effect & Mobile-optimized heights */}
        {storyInfo.imageUrl && (
          <div className="w-full h-[250px] sm:h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            <img
              src={storyInfo.imageUrl}
              alt={storyInfo.title}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Story Text */}
        <div className="text-base text-slate-700 leading-relaxed whitespace-pre-line pt-2">
          {storyInfo.story}
        </div>
      </div>
    </div>
  );
};

export default ViewTravelStory;
