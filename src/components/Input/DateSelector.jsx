import { useState } from "react"; // FIXED: lowercase 'import'
import { MdClose, MdOutlineDateRange } from "react-icons/md";
import moment from "moment";
import { DayPicker } from "react-day-picker";

const DateSelector = ({ date, setDate }) => {
  const [openDatePicker, setOpenDatePicker] = useState(false);

  return (
    <div className="relative">
      <button
        type="button" // FIXED: Prevents accidental form submissions
        className="inline-flex items-center gap-2 text-[13px] font-medium text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border border-cyan-100 rounded-md px-3 py-1.5 cursor-pointer transition-colors"
        onClick={() => {
          setOpenDatePicker(true);
        }}
      >
        <MdOutlineDateRange className="text-lg opacity-80" />
        {date
          ? moment(date).format("Do MMMM YYYY")
          : moment().format("Do MMMM YYYY")}
      </button>

      {openDatePicker && (
        <div className="mt-2 p-3 sm:p-5 bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 relative z-10 inline-block">
          <button
            type="button" // FIXED: Prevents accidental form submissions
            className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-50 hover:bg-slate-100 absolute top-3 right-3 text-slate-500 hover:text-slate-800 transition-colors"
            onClick={() => {
              setOpenDatePicker(false);
            }}
          >
            <MdClose className="text-xl" />
          </button>

          <div className="flex justify-center pt-6 sm:pt-2 overflow-x-auto">
            <DayPicker
              captionLayout="dropdown-buttons"
              mode="single"
              selected={date}
              onSelect={(selectedDate) => {
                if (selectedDate) {
                  setDate(selectedDate);
                  // UX IMPROVEMENT: Automatically close the calendar once a date is picked!
                  setOpenDatePicker(false);
                }
              }}
              pagedNavigation
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default DateSelector;
