let groups = [];

// script.js
window.addEventListener("load", async () => {
  if (!findPageByName("DISPLAY_GROUP")) {
    goToPage("homePage.html");
    return;
  }
  // get the groups
  let res = await getGroups();
  // console.log(res);
  groups = res.items;
  renderGroups(groups);
});

// Function to render groups in the table
function renderGroups(groupList) {
  const tbody = document
    .getElementById("groupTable")
    .getElementsByTagName("tbody")[0];
  tbody.innerHTML = ""; // Clear the table

  groupList.forEach((group, index) => {
    const row = tbody.insertRow();
    // row.insertCell(0).textContent = group.group_id;
    row.insertCell(0).textContent = group.group_name;
    row.insertCell(1).textContent = group.group_description;

    // Add a delete button
    // const actionCell = row.insertCell(3);
    // const deleteBtn = document.createElement("button");
    // deleteBtn.textContent = "Delete";
    // deleteBtn.classList.add("removeBtn");
    // deleteBtn.addEventListener("click", () => deleteGroup(index));
    // actionCell.appendChild(deleteBtn);
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
  return filteredGroups;
}

// Initial render of all groups

// Add event listener for search input
document
  .getElementById("searchInput")
  .addEventListener("input", async function (event) {
    const searchTerm = event.target.value;
    let filteredGroups = filterGroups(searchTerm);
    if (filteredGroups.length == 0) {
      let res = await getGroups(searchTerm);
      // console.log(res);
      filteredGroups = res.items;
    }
    renderGroups(filteredGroups);
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
