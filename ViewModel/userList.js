// script.js
window.addEventListener("load", async () => {
  if (!findPageByName("DISPLAY_USERS")) {
    goToPage("homePage.html");
  }
});
// Sample user data
let users = [
  {
    user_id: 1,
    username: "john.doe",
    email: "john.doe@example.com",
    first_name: "John",
    last_name: "Doe",
  },
  {
    user_id: 2,
    username: "jane.smith",
    email: "jane.smith@example.com",
    first_name: "Jane",
    last_name: "Smith",
  },
  {
    user_id: 3,
    username: "omar.ahmed",
    email: "omar.ahmed@home.com",
    first_name: "Omar",
    last_name: "Ahmed",
  },
  {
    user_id: 4,
    username: "sara.jones",
    email: "sara.jones@example.com",
    first_name: "Sara",
    last_name: "Jones",
  },
];

let selectedUser = null;

// Function to render users in the table
function renderUsers(userList) {
  const tbody = document
    .getElementById("usersTable")
    .getElementsByTagName("tbody")[0];
  tbody.innerHTML = ""; // Clear the table

  userList.forEach((user) => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = user.user_id;
    row.insertCell(1).textContent = user.username;
    row.insertCell(2).textContent = user.email;
    row.insertCell(3).textContent = user.first_name;
    row.insertCell(4).textContent = user.last_name;

    // Add click event to select a row
    row.addEventListener("click", () => {
      // Remove selection from all rows
      Array.from(tbody.rows).forEach((r) => r.classList.remove("selected"));

      // Select the clicked row
      row.classList.add("selected");
      selectedUser = user;

      // Enable buttons
      document.getElementById("deleteBtn").disabled = false;
      document.getElementById("updateBtn").disabled = false;
    });
  });
}

// Function to filter users by username
function filterUsers(searchTerm) {
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderUsers(filteredUsers);
}

// Initial render of all users
renderUsers(users);

// Add event listener for search input
document
  .getElementById("searchInput")
  .addEventListener("input", function (event) {
    const searchTerm = event.target.value;
    filterUsers(searchTerm);
  });

// Delete button functionality
document.getElementById("deleteBtn").addEventListener("click", function () {
  if (selectedUser) {
    // Remove the selected user from the users array
    users = users.filter((user) => user.user_id !== selectedUser.user_id);

    // Re-render the table
    renderUsers(users);

    // Clear selection and disable buttons
    selectedUser = null;
    document.getElementById("deleteBtn").disabled = true;
    document.getElementById("updateBtn").disabled = true;
  }
});

// Update button functionality
document.getElementById("updateBtn").addEventListener("click", function () {
  if (selectedUser) {
    console.log("Selected User Data:", selectedUser);
  }
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
