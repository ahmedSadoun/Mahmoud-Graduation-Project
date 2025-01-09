// script.js
document.getElementById("addPageBtn").addEventListener("click", function () {
  const pageSelect = document.getElementById("pageSelect");
  const selectedPage = pageSelect.value;

  if (selectedPage === "") {
    alert("Please select a page.");
    return;
  }

  // Check if the page is already added
  const pagesTable = document
    .getElementById("pagesTable")
    .getElementsByTagName("tbody")[0];
  const existingPages = Array.from(pagesTable.rows).map(
    (row) => row.cells[0].textContent
  );

  if (existingPages.includes(selectedPage)) {
    alert("This page has already been added.");
    return;
  }

  // Add the page to the table
  const newRow = pagesTable.insertRow();
  const pageCell = newRow.insertCell(0);
  const actionCell = newRow.insertCell(1);

  pageCell.textContent = selectedPage;
  actionCell.innerHTML = '<button class="removePageBtn">Remove</button>';

  // Add event listener to the remove button
  actionCell
    .querySelector(".removePageBtn")
    .addEventListener("click", function () {
      pagesTable.deleteRow(newRow.rowIndex - 1);
    });

  // Clear the dropdown selection
  pageSelect.value = "";
});

document
  .getElementById("roleCreationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get input values
    const roleName = document.getElementById("roleName").value;

    // Get assigned pages from the table
    const pagesTable = document
      .getElementById("pagesTable")
      .getElementsByTagName("tbody")[0];
    const pages = Array.from(pagesTable.rows).map(
      (row) => row.cells[0].textContent
    );

    // Basic validation
    if (roleName.trim() === "" || pages.length === 0) {
      alert("Please fill in the role name and add at least one page.");
      return;
    }

    // Create a role object
    const role = {
      name: roleName,
      pages: pages,
    };

    // Display the role details (for now, just log to the console)
    console.log("Role Created:", role);
    alert(
      `Role created successfully!\nRole Name: ${
        role.name
      }\nPages: ${role.pages.join(", ")}`
    );

    // Clear the form
    document.getElementById("roleCreationForm").reset();
    pagesTable.innerHTML = ""; // Clear the pages table

    // You can send the role data to a backend server here
    // Example: fetch('/api/roles', { method: 'POST', body: JSON.stringify(role) });
  });
