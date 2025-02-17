function x(inputDate) {
  // Parse the input date string into a Date object
  const date = new Date(inputDate);

  // Get the current year and month from the input date
  const year = date.getFullYear();
  const month = date.getMonth();

  // Calculate the first day of the second month
  // If the current month is December, the second month will be January of the next year
  const firstDayOfSecondMonth = new Date(year, month + 1, 1);

  // Format the date as YYYY-MM-DD manually to avoid timezone issues
  const formattedDate = `${firstDayOfSecondMonth.getFullYear()}-${String(
    firstDayOfSecondMonth.getMonth() + 1
  ).padStart(2, "0")}-${String(firstDayOfSecondMonth.getDate()).padStart(
    2,
    "0"
  )}`;

  console.log("First day of the second month: ", formattedDate);

  return formattedDate;
}

// Test the function
console.log(x("2025-02-16")); // Output: "2025-03-01"
console.log(x("2025-12-16")); // Output: "2026-01-01"
