import { FaHeart } from "react-icons/fa"; // FIXED: lowercase 'import'
import { MdGroups } from "react-icons/md";
import { getFormattedDate } from "../../utils/helper";

const TravelStoryCard = ({
  imageUrl,
  title,
  story,
  date,
  visitedLocations,
  isFavourite,
  onClick,
  onFavouriteClick,
}) => {
  // Safely converts array to comma-separated string, or just returns the string
  const displayLocations = Array.isArray(visitedLocations)
    ? visitedLocations.join(", ")
    : visitedLocations;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col group h-full"
    >
      {/* Top Image Section */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 bg-slate-100 overflow-hidden shrink-0">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Favourite Button (Overlaid on Image top-right) */}
        <button
          type="button" // Prevents any weird bubbling if this card is ever in a form
          onClick={(e) => {
            e.stopPropagation(); // Prevents opening the story when clicking the heart
            onFavouriteClick();
          }}
          className="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center bg-black/20 backdrop-blur-md rounded-full hover:bg-black/40 transition-all z-10"
          aria-label="Toggle favourite"
        >
          <FaHeart
            className={`text-sm sm:text-base transition-colors ${
              isFavourite ? "text-rose-500" : "text-white/90 hover:text-white"
            }`}
          />
        </button>
      </div>

      {/* Content Section */}
      {/* Added flex-1 to push the locations badge to the bottom evenly */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 gap-2">
        {/* Title & Date */}
        <div>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 line-clamp-1">
            {title}
          </h3>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
            {getFormattedDate(date)}
          </p>
        </div>

        {/* Story Snippet */}
        <p className="text-sm text-slate-600 line-clamp-2 mt-1 mb-2 flex-1">
          {story}
        </p>

        {/* Visited Locations Badge - 'mt-auto' forces it to the bottom */}
        {displayLocations && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-cyan-50 text-cyan-700 text-xs font-medium w-max max-w-full border border-cyan-100 mt-auto">
            <MdGroups className="text-sm shrink-0 opacity-80" />
            <span className="truncate">{displayLocations}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TravelStoryCard;
