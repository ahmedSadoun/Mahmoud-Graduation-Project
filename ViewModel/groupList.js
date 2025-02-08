// script.js
// Sample group data
const data = {
  items: [
    {
      group_id: 4,
      group_name: "new Group",
      group_description: "test from postman",
      is_deleted: "F",
    },
    {
      group_id: 1,
      group_name: "Admins",
      group_description: "Group of system administrators",
      is_deleted: "F",
    },
    {
      group_id: 2,
      group_name: "Editors",
      group_description: "Content editors group",
      is_deleted: "F",
    },
    {
      group_id: 3,
      group_name: "Viewers",
      group_description: "Group with view-only permissions",
      is_deleted: "F",
    },
  ],
  hasMore: false,
  limit: 25,
  offset: 0,
  count: 4,
  links: [
    {
      rel: "self",
      href: "http://windinfosys.com/ords/saadoun_task/User_Management/groups",
    },
    {
      rel: "edit",
      href: "http://windinfosys.com/ords/saadoun_task/User_Management/groups",
    },
    {
      rel: "describedby",
      href: "http://windinfosys.com/ords/saadoun_task/metadata-catalog/User_Management/item",
    },
    {
      rel: "first",
      href: "http://windinfosys.com/ords/saadoun_task/User_Management/groups",
    },
  ],
};

let groups = data.items; // Extract the groups from the data

// Function to render groups in the table
function renderGroups(groupList) {
  const tbody = document
    .getElementById("groupTable")
    .getElementsByTagName("tbody")[0];
  tbody.innerHTML = ""; // Clear the table

  groupList.forEach((group, index) => {
    const row = tbody.insertRow();
    row.insertCell(0).textContent = group.group_id;
    row.insertCell(1).textContent = group.group_name;
    row.insertCell(2).textContent = group.group_description;

    // Add a delete button
    const actionCell = row.insertCell(3);
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("removeBtn");
    deleteBtn.addEventListener("click", () => deleteGroup(index));
    actionCell.appendChild(deleteBtn);
  });
}

// Function to delete a group
function deleteGroup(index) {
  groups.splice(index, 1); // Remove the group from the array
  renderGroups(groups); // Re-render the table
}

// Function to filter groups by name or description
function filterGroups(searchTerm) {
  const filteredGroups = groups.filter(
    (group) =>
      group.group_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      group.group_description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  renderGroups(filteredGroups);
}

// Initial render of all groups
renderGroups(groups);

// Add event listener for search input
document
  .getElementById("searchInput")
  .addEventListener("input", function (event) {
    const searchTerm = event.target.value;
    filterGroups(searchTerm);
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
