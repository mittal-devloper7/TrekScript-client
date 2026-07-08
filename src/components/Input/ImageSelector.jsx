import { useRef, useState, useEffect } from "react"; // FIXED: lowercase 'import'
import { FaRegFileImage } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const ImageSelector = ({ image, setImage, handleDeleteImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  // Trigger the hidden file input when the button is clicked
  const onChooseFile = () => {
    inputRef.current.click();
  };

  // Handle the file selection
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      // Create a local URL so we can preview the image immediately
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // Allow the user to remove the selected image
  const handleRemoveImage = () => {
    handleDeleteImage();
    setImage(null);
    setPreviewUrl(null);
    // Reset the input value so the same file can be selected again if needed
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // Cleanup the object URL when component unmounts to prevent memory leaks
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {/* If we DO NOT have an image, show the upload button */}
      {!image && !previewUrl ? (
        <button
          type="button" // FIXED: Prevents accidental form submissions
          className="w-full h-[150px] sm:h-[220px] flex flex-col items-center justify-center gap-4 bg-slate-50 rounded-xl border border-slate-200 border-dashed hover:bg-slate-100 transition-colors"
          onClick={onChooseFile}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-cyan-50 rounded-full border border-cyan-100">
            <FaRegFileImage className="text-xl text-cyan-500" />
          </div>
          <p className="text-sm text-slate-500">Browse image files to upload</p>
        </button>
      ) : (
        /* If we DO have an image, show the preview and a delete button */
        <div className="w-full relative">
          <img
            src={previewUrl || image} // Fallback to `image` if it's passed down as an existing URL (e.g., when editing)
            alt="Selected"
            className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover rounded-xl border border-slate-200"
          />
          <button
            type="button" // FIXED: Prevents accidental form submissions
            className="absolute top-2 right-2 w-10 h-10 sm:w-8 sm:h-8 flex items-center justify-center bg-white/70 hover:bg-white text-rose-500 rounded-full shadow-sm backdrop-blur transition-colors"
            onClick={handleRemoveImage}
          >
            <MdDeleteOutline className="text-xl sm:text-lg" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageSelector;
