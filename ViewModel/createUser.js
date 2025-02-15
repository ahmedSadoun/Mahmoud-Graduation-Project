window.addEventListener("load", async () => {
  if (!findPageByName("CREATE_USERS")) {
    goToPage("homePage.html");
  }
  let res = await getGroups();
  console.table(res.items);
  populateRoleSelect(res.items);
});

function populateRoleSelect(items) {
  // Get the select element by its ID
  const selectElement = document.getElementById("roleSelect");

  // Clear any existing options except the first one (the default option)
  selectElement.innerHTML = '<option value="">Select a Group</option>';

  // Iterate over the items array and create an option element for each group
  items.forEach((item) => {
    // Create a new option element
    const option = document.createElement("option");

    // Set the value and text content of the option
    option.value = item.group_id;
    option.textContent = item.group_name;

    // Append the option to the select element
    selectElement.appendChild(option);
  });
}

// script.js
let groupList = [];
document
  .getElementById("createGroupBtn")
  .addEventListener("click", function () {
    const roleSelect = document.getElementById("roleSelect");
    const selectedOption =
      roleSelect.options[roleSelect.selectedIndex].textContent;
    const selectedRole = roleSelect.value;
    // console.log("label ", selectedOption.textContent);

    if (selectedRole === "") {
      alert("Please select a role.");
      return;
    }

    // Check if the role is already added
    const rolesTable = document
      .getElementById("rolesTable")
      .getElementsByTagName("tbody")[0];
    const existingRoles = Array.from(rolesTable.rows).map(
      (row) => row.cells[0].textContent
    );

    if (existingRoles.includes(selectedRole)) {
      alert("This role has already been added.");
      return;
    }
    groupList.push({ group_id: selectedRole, group_name: selectedOption });

    // Add the role to the table
    const newRow = rolesTable.insertRow();
    const roleCell = newRow.insertCell(0);

    const actionCell = newRow.insertCell(1);

    roleCell.textContent = selectedOption;
    actionCell.innerHTML = '<button class="removeRoleBtn">Remove</button>';

    // Add event listener to the remove button
    actionCell
      .querySelector(".removeRoleBtn")
      .addEventListener("click", function () {
        rolesTable.deleteRow(newRow.rowIndex - 1);
        groupList = removeRowByGroupId(groupList, newRow.cells[0].innerText);
        console.log("groupList", groupList);
      });

    // Clear the dropdown selection
    roleSelect.value = "";
  });
function removeRowByGroupId(list, groupNameToRemove) {
  // Use the filter method to create a new list excluding the row with the matching group_name
  const updatedList = list.filter(
    (item) => item.group_name !== groupNameToRemove
  );
  // console.log("updatedList ", updatedList);
  // Return the updated list
  return updatedList;
}
document
  .getElementById("userCreationForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get input values
    const first_name = document.getElementById("firstName").value;
    const last_name = document.getElementById("lastName").value;
    const username = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const roles = groupList;

    // Basic validation
    if (
      first_name.trim() === "" ||
      last_name.trim() === "" ||
      username.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      roles.length === 0
    ) {
      alert("Please fill in all fields and add at least one role.");
      return;
    }

    // Create a user object
    const user = {
      first_name: first_name,
      last_name: last_name,
      username: username,
      email: email,
      password: password,
    };
    // roles: roles,
    let res = await createUser(user);
    if (res && res.status == "200") {
      // Display the user details (for now, just log to the console)
      if (roles.length > 0) {
        let groupsCreationRes = await createUserGroups(groupList, res.user_id);
        if (groupsCreationRes && groupsCreationRes.status !== "200") {
          alert(`Error happened while creating the user groups!`);
          return;
        }
      }
      alert(`User created successfully!`);
      // Clear the form
      document.getElementById("userCreationForm").reset();
      rolesTable.innerHTML = ""; // Clear the roles table
      goToPage("createUser.html");
      // console.log("User Created:", user);

      // You can send the user data to a backend server here
      // Example: fetch('/api/users', { method: 'POST', body: JSON.stringify(user) });
    } else {
      alert(
        `Error happened while creating the user, make  sure that the email, username are unique!`
      );
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
