// FIXED: Proper Regex for Email Validation
export const validEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const getFormattedDate = (dateString) => {
  if (!dateString) return "";
  const dateObj = new Date(dateString);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "short" });
  const year = dateObj.getFullYear();

  // Determine the ordinal suffix (st, nd, rd, th)
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";

  return `${day}${suffix} ${month} ${year}`;
};
