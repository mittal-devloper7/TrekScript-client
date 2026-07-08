import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { DayPicker } from "react-day-picker";
import moment from "moment";
import { MdAdd, MdClose } from "react-icons/md";
import { toast } from "react-toastify";

import Navbar from "../../components/Navbar";
import axiosInstance from "../../utils/axiosInstance";
import TravelStoryCard from "../../components/cards/TravelStoryCard";
import AddEditTravelStory from "./AddEditTravelStory";
import ViewTravelStory from "./ViewTravelStory";
import EmptyCard from "../../components/cards/EmptyCard";

const Home = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTypes, setFilterTypes] = useState("all");
  const [userInfo, setUserInfo] = useState(null);
  const [allStories, setAllStories] = useState([]);

  // FIXED: Changed 'form' to 'from' to match react-day-picker specifications
  const [dateRange, setDateRange] = useState({ from: null, to: null });

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [openViewStoryModal, setOpenViewStoryModal] = useState({
    isShown: false,
    data: null,
  });

  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        navigate("/login");
      }
    }
  };

  const getAllTravelStories = async () => {
    try {
      const response = await axiosInstance.get("/get-all-scripts");
      if (response.data && response.data.stories) {
        setAllStories(response.data.stories);
      }
    } catch (e) {
      console.error("Error fetching travel stories:", e);
    }
  };

  const handleEdit = (story) => {
    setOpenAddEditModal({
      isShown: true,
      type: "edit",
      data: story,
    });
  };

  const handleViewStory = (story) => {
    setOpenViewStoryModal({ isShown: true, data: story });
  };

  const updateIsFavourite = async (story) => {
    const storyId = story._id;
    const newFavouriteStatus = !story.isFavourite;

    try {
      const response = await axiosInstance.put(
        "/update-is-favourite/" + storyId,
        {
          isFavourite: newFavouriteStatus,
        },
      );

      if (response.data && response.data.story) {
        setAllStories((prevStories) =>
          prevStories.map((item) =>
            item._id === storyId
              ? { ...item, isFavourite: newFavouriteStatus }
              : item,
          ),
        );
      }
      toast.success(
        `${newFavouriteStatus ? "Added to" : "Removed from"} favourites!`,
      );
    } catch (error) {
      console.error("Error updating favourite status:", error);
      toast.error("Failed to update favourite status. Please try again.");
    }
  };

  const deleteTravelStory = async (story) => {
    if (!story || !story._id) return;
    const storyId = story._id;

    try {
      const response = await axiosInstance.delete(
        "/delete-trekscript/" + storyId,
      );

      if (response.data) {
        toast.success("Story Deleted Successfully!");
        setOpenViewStoryModal({ isShown: false, data: null });
        getAllTravelStories();
      }
    } catch (error) {
      console.error("Error deleting story:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred while deleting the story.");
      }
    }
  };

  const onSearchStory = async () => {
    if (!searchQuery) return;

    try {
      const response = await axiosInstance.get("/search", {
        params: { query: searchQuery },
      });

      if (response.data && response.data.stories) {
        setFilterTypes("search");
        setAllStories(response.data.stories);
      }
    } catch (error) {
      console.error("Error searching stories:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    setFilterTypes("all");
    getAllTravelStories();
  };

  const filterStoriesByDate = async (day) => {
    try {
      // Safely check if day exists before trying to access .from or .to
      const startDate = day?.from ? moment(day.from).valueOf() : null;
      const endDate = day?.to ? moment(day.to).valueOf() : null;

      if (startDate && endDate) {
        const response = await axiosInstance.get("/trek-scripts/filters", {
          params: {
            startDate,
            endDate,
          },
        });

        if (response.data && response.data.stories) {
          setFilterTypes("date");
          setAllStories(response.data.stories);
        }
      }
    } catch (e) {
      console.error("Error filtering stories by date:", e);
    }
  };

  const handleDayClick = (day) => {
    setDateRange(day);
    filterStoriesByDate(day);
  };

  // ADDED: Logic to clear the date filter and fetch all stories
  const clearDateFilter = () => {
    setDateRange({ from: null, to: null });
    setFilterTypes("all");
    getAllTravelStories();
  };

  useEffect(() => {
    getUserInfo();
    getAllTravelStories();
  }, []);

  // Helper to determine what message the EmptyCard should show
  const getEmptyCardMessage = () => {
    if (filterTypes === "search")
      return "No stories found matching your search.";
    if (filterTypes === "date") return "No stories found in this date range.";
    return "Start creating your first Travel Story! Click the 'Add' button to jot down your thoughts, ideas, and memories. Let's get started!";
  };

  return (
    <div className="h-screen overflow-y-auto no-scrollbar bg-slate-50">
      <Navbar
        userInfo={userInfo}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchNote={onSearchStory}
        handleClearSearch={handleClearSearch}
      />

      {/* MOBILE/DESKTOP RESPONSIVE WRAPPER */}
      <div className="container mx-auto py-8 px-4 sm:px-10 md:px-16 lg:px-24">
        {/* FIXED: Changed layout to stack on mobile (flex-col) and sit side-by-side on desktop (lg:flex-row) */}
        <div className="flex flex-col-reverse lg:flex-row gap-7">
          {/* Main Content Area (Stories) */}
          <div className="flex-1">
            {allStories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {allStories.map((story) => (
                  <TravelStoryCard
                    key={story._id}
                    imageUrl={story.imageUrl}
                    title={story.title}
                    story={story.story}
                    date={story.visitedDate}
                    visitedLocations={story.visitedLocations}
                    isFavourite={story.isFavourite}
                    onClick={() => handleViewStory(story)}
                    onEdit={() => handleEdit(story)}
                    onFavouriteClick={() => updateIsFavourite(story)}
                  />
                ))}
              </div>
            ) : (
              <EmptyCard message={getEmptyCardMessage()} />
            )}
          </div>

          {/* Sidebar / Calendar (Now fully responsive) */}
          <div className="w-full lg:w-[350px]">
            <div className="bg-white border border-slate-200 shadow-sm rounded-xl flex flex-col items-center">
              <div className="p-3 w-full flex justify-center">
                <DayPicker
                  captionLayout="dropdown-buttons"
                  mode="range"
                  selected={dateRange}
                  onSelect={handleDayClick}
                  pagedNavigation // FIXED: React requires camelCase for attributes
                />
              </div>

              {/* ADDED: Clear Filter Button when a date is selected */}
              {dateRange && dateRange.from && (
                <div className="w-full p-4 border-t border-slate-100 mt-2">
                  <button
                    onClick={clearDateFilter}
                    className="w-full flex items-center justify-center gap-2 text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 hover:text-slate-800 transition-colors py-2 rounded-lg font-medium"
                  >
                    <MdClose className="text-lg" />
                    Clear Date Filter
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add / Edit Modal */}
      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() =>
          setOpenAddEditModal({ isShown: false, type: "add", data: null })
        }
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 999 }, // Darkened overlay slightly for better contrast
        }}
        appElement={document.getElementById("root")}
        className="modal-box w-[90vw] md:w-[70vw] lg:w-[50vw] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-none" // ADDED strict Tailwind centering and responsive widths for mobile
      >
        <AddEditTravelStory
          storyInfo={openAddEditModal.data}
          type={openAddEditModal.type}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllTravelStories={getAllTravelStories}
        />
      </Modal>

      {/* View Story Modal */}
      <Modal
        isOpen={openViewStoryModal.isShown}
        onRequestClose={() =>
          setOpenViewStoryModal({ isShown: false, data: null })
        }
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.4)", zIndex: 999 },
        }}
        appElement={document.getElementById("root")}
        className="modal-box w-[90vw] md:w-[70vw] lg:w-[50vw] max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-none"
      >
        <ViewTravelStory
          storyInfo={openViewStoryModal.data || null}
          onClose={() => {
            setOpenViewStoryModal((prevState) => ({
              ...prevState,
              isShown: false,
            }));
          }}
          onEditClick={() => {
            setOpenViewStoryModal((prevState) => ({
              ...prevState,
              isShown: false,
            }));
            handleEdit(openViewStoryModal.data || null);
          }}
          onDeleteClick={() => {
            deleteTravelStory(openViewStoryModal.data || null);
          }}
        />
      </Modal>

      {/* Floating Add Button - Adjusted positioning for mobile screens */}
      <button
        className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-cyan-400 shadow-lg fixed bottom-6 right-6 sm:bottom-10 sm:right-8 transition-colors z-50"
        onClick={() => {
          setOpenAddEditModal({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-3xl text-white" />
      </button>
    </div>
  );
};

export default Home;
