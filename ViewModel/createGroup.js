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

// header logic goes here
// script.js
const burgerMenu = document.getElementById("burgerMenu");
const sidebar = document.getElementById("sidebar");
const userInfo = document.getElementById("userInfo");

// Check if a user is logged in
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
  // Display user details
  userInfo.innerHTML = `
    <span>${user.username}</span>
    <img src="${
      user.avatar ||
      "https://img.icons8.com/?size=100&id=7820&format=png&color=000000"
    }" alt="User Avatar" class="user-avatar">
    <div class="dropdown" id="dropdown">
      <ul>
        <li onclick="window.location.href='profile.html'">Profile</li>
        <li onclick="logout()">Logout</li>
      </ul>
    </div>
  `;

  // Show navigation menu
  burgerMenu.style.display = "block";
  sidebar.style.display = "block";
} else {
  // Show login button
  userInfo.innerHTML = `<button class="login-btn" onclick="window.location.href='login.html'">Login</button>`;

  // Hide navigation menu
  burgerMenu.style.display = "none";
  sidebar.style.display = "none";
}

// Toggle sidebar on burger menu click
burgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Toggle dropdown on user info click
userInfo.addEventListener("click", (event) => {
  if (event.target.closest(".user-avatar") || event.target.closest("span")) {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.toggle("active");
  }
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (!userInfo.contains(event.target)) {
    const dropdown = document.getElementById("dropdown");
    dropdown.classList.remove("active");
  }
});

// Logout function
function logout() {
  localStorage.removeItem("user");
  goToPage("homePage.html");
  // window.location.href = "login.html";
}
// header logic ends here
