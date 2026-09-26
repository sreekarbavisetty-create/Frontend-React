/**
 * Formats a numeric cost into Indian Currency format: Rs 5,30,332 (no decimals).
 * If cost is 0, null, or undefined, returns "Not estimated".
 * 
 * @param {number|null|undefined} cost 
 * @returns {string}
 */
export function formatCost(cost) {
  if (cost === 0 || cost === null || cost === undefined || isNaN(cost)) {
    return "Not estimated";
  }

  const formattedNumber = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(cost);

  return `Rs ${formattedNumber}`;
}

/**
 * Formats a date string (e.g. "2026-09-01") into "01 Sep 2026".
 * 
 * @param {string|Date} dateInput 
 * @returns {string}
 */
export function formatDate(dateInput) {
  if (!dateInput) return "";
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  // en-GB produces DD Mon YYYY format
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Formats start and end dates into a readable range string: "01 Sep 2026 - 15 Dec 2026".
 * 
 * @param {string|Date} startDate 
 * @param {string|Date} endDate 
 * @returns {string}
 */
export function formatDateRange(startDate, endDate) {
  const formattedStart = formatDate(startDate);
  const formattedEnd = formatDate(endDate);

  if (formattedStart && formattedEnd) {
    return `${formattedStart} - ${formattedEnd}`;
  }
  return formattedStart || formattedEnd || "Dates not set";
}
