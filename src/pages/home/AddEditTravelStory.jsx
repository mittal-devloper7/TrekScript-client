import { MdAdd, MdClose, MdUpdate } from "react-icons/md"; // FIXED: lowercase 'import'
import DateSelector from "../../components/Input/DateSelector";
import { useState } from "react";
import ImageSelector from "../../components/Input/ImageSelector";
import TagInput from "../../components/Input/TagInput";
import { toast } from "react-toastify"; // For user feedback
import axiosInstance from "../../utils/axiosInstance";
import moment from "moment";
import uploadImage from "../../utils/image"; // Helper function for image uploads

const AddEditTravelStory = ({
  storyInfo,
  type,
  onClose,
  getAllTravelStories,
}) => {
  // Initialize state with storyInfo so the form pre-fills when editing
  const [title, setTitle] = useState(storyInfo?.title || "");
  const [storyImg, setStoryImg] = useState(storyInfo?.imageUrl || null);
  const [story, setStory] = useState(storyInfo?.story || "");
  const [visitedLocations, setVisitedLocations] = useState(
    storyInfo?.visitedLocations || [],
  );
  const [visitedDate, setVisitedDate] = useState(
    storyInfo?.visitedDate || moment(),
  );
  const [error, setError] = useState("");

  const handleAddOrUpdateClick = () => {
    // 1. Validate Title
    if (!title || title.trim() === "") {
      toast.error("Please enter a title for your story.");
      setError("Please enter a title for your story.");
      return;
    }

    // 2. Validate Date
    if (!visitedDate) {
      toast.error("Please select the date you visited.");
      setError("Please select the date you visited.");
      return;
    }

    // 3. Validate Image
    if (!storyImg) {
      toast.error("Please select an image for your story.");
      setError("Please select an image for your story.");
      return;
    }

    // 4. Validate Story Text
    if (!story || story.trim() === "") {
      toast.error("Please write your travel story.");
      setError("Please write your travel story.");
      return;
    }

    // 5. Validate Visited Locations (Friends)
    if (!visitedLocations || visitedLocations.length === 0) {
      toast.error("Please add at least one friend.");
      setError("Please add at least one friend.");
      return;
    }

    // Clear any existing errors
    setError("");

    if (type === "add") {
      addNewTravelStory();
    } else {
      updateTravelStory();
    }
  };

  // --- Helper Functions for API Calls ---

  const addNewTravelStory = async () => {
    try {
      let imageUrl = "";

      // Upload the image first if it exists and is a File object
      if (storyImg && typeof storyImg === "object") {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || imgUploadRes.data?.imageUrl;
      }

      // Send the POST request to your backend
      const response = await axiosInstance.post("/add-trekscript", {
        title,
        story,
        visitedLocations,
        // Send the date as a Unix timestamp
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
        imageUrl: imageUrl || "",
      });

      // Handle successful response
      if (response.data) {
        toast.success("Story Added Successfully!");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      console.error("Error adding story:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        toast.error("Failed to add story.");
      }
    }
  };

  const updateTravelStory = async () => {
    const storyId = storyInfo._id;
    try {
      let imageUrl = "";

      let postData = {
        title,
        story,
        visitedLocations,
        visitedDate: visitedDate
          ? moment(visitedDate).valueOf()
          : moment().valueOf(),
        imageUrl: storyInfo.imageUrl || "", // Keep the old image by default
      };

      // If the user selected a NEW image, upload it and update the postData
      if (typeof storyImg === "object") {
        const imgUploadRes = await uploadImage(storyImg);
        imageUrl = imgUploadRes.imageUrl || imgUploadRes.data?.imageUrl;

        postData = {
          ...postData,
          imageUrl: imageUrl || "",
        };
      }

      // Send the PUT request to your backend
      const response = await axiosInstance.put(
        "/edit-trekscript/" + storyId,
        postData,
      );

      if (response.data) {
        toast.success("Story Updated Successfully!");
        getAllTravelStories();
        onClose();
      }
    } catch (error) {
      console.error("Error updating story:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
        toast.error("Failed to update story.");
      }
    }
  };

  const handleDeleteStoryImage = async () => {
    try {
      // 1. Only attempt API deletion if we are editing an existing story with an image
      if (type === "edit" && storyInfo && storyInfo.imageUrl) {
        const deleteImgRes = await axiosInstance.delete("/delete-image", {
          params: { imageUrl: storyInfo.imageUrl },
        });

        if (deleteImgRes.data) {
          const storyId = storyInfo._id;

          const postData = {
            title,
            story,
            visitedLocations,
            // Keep the current date state, don't force it to today
            visitedDate: visitedDate
              ? moment(visitedDate).valueOf()
              : moment().valueOf(),
            imageUrl: "",
          };

          await axiosInstance.put("/edit-trekscript/" + storyId, postData);
        }
      }

      // 2. Always clear the image from the local UI state
      setStoryImg(null);
      toast.success("Image removed");
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to remove image. Please try again.");
    }
  };

  return (
    <div className="relative pb-2">
      {/* Header section */}
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg sm:text-xl font-bold text-slate-800">
          {type === "add" ? "Add New Travel Story" : "Edit Travel Story"}
        </h5>

        <div className="flex items-center gap-2">
          {type === "add" ? (
            <button
              className="flex items-center gap-1.5 bg-cyan-50 text-cyan-700 px-3 py-1.5 rounded-lg hover:bg-cyan-100 transition-colors text-sm font-medium"
              onClick={handleAddOrUpdateClick}
            >
              <MdAdd className="text-lg" />
              Add Story
            </button>
          ) : (
            <button
              className="flex items-center gap-1.5 bg-cyan-50 text-cyan-700 px-3 py-1.5 rounded-lg hover:bg-cyan-100 transition-colors text-sm font-medium"
              onClick={handleAddOrUpdateClick}
            >
              <MdUpdate className="text-lg" />
              Update
            </button>
          )}

          <button
            className="ml-1 w-8 h-8 flex items-center justify-center bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors shrink-0"
            onClick={onClose}
          >
            <MdClose className="text-xl" />
          </button>
        </div>
      </div>

      {error && (
        <p className="text-xs text-rose-500 mb-2 text-right">{error}</p>
      )}

      {/* Form section */}
      <div className="flex-1 flex flex-col gap-4 pt-2">
        <div>
          <label className="input-label text-xs font-semibold text-slate-500 mb-1 block">
            TITLE
          </label>
          <input
            type="text"
            className="text-xl sm:text-2xl font-medium text-slate-950 outline-none w-full border-b border-slate-200 pb-2 focus:border-cyan-400 transition-colors"
            placeholder="A day as a College Student"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div className="my-1">
          <DateSelector date={visitedDate} setDate={setVisitedDate} />
        </div>

        <ImageSelector
          image={storyImg}
          setImage={setStoryImg}
          handleDeleteImage={handleDeleteStoryImage}
        />

        <div className="flex-1 flex flex-col">
          <label className="input-label text-xs font-semibold text-slate-500 mb-1 block">
            STORY
          </label>
          <textarea
            className="text-sm text-slate-800 outline-none bg-slate-50 p-4 rounded-xl w-full border border-slate-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 resize-none flex-1 min-h-[150px] sm:min-h-[200px] transition-all"
            placeholder="Tell us about your story..."
            value={story}
            onChange={({ target }) => setStory(target.value)}
          />
        </div>

        <div className="pt-2">
          <label className="input-label text-xs font-semibold text-slate-500 mb-1 block">
            FRIENDS
          </label>
          <TagInput tags={visitedLocations} setTags={setVisitedLocations} />
        </div>
      </div>
    </div>
  );
};

export default AddEditTravelStory;
