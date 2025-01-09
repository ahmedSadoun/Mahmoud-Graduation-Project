// script.js
document.getElementById("addRoleBtn").addEventListener("click", function () {
  const roleSelect = document.getElementById("roleSelect");
  const selectedRole = roleSelect.value;

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

  // Add the role to the table
  const newRow = rolesTable.insertRow();
  const roleCell = newRow.insertCell(0);
  const actionCell = newRow.insertCell(1);

  roleCell.textContent = selectedRole;
  actionCell.innerHTML = '<button class="removeRoleBtn">Remove</button>';

  // Add event listener to the remove button
  actionCell
    .querySelector(".removeRoleBtn")
    .addEventListener("click", function () {
      rolesTable.deleteRow(newRow.rowIndex - 1);
    });

  // Clear the dropdown selection
  roleSelect.value = "";
});

document
  .getElementById("userCreationForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get input values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Get selected roles from the table
    const rolesTable = document
      .getElementById("rolesTable")
      .getElementsByTagName("tbody")[0];
    const roles = Array.from(rolesTable.rows).map(
      (row) => row.cells[0].textContent
    );

    // Basic validation
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password.trim() === "" ||
      roles.length === 0
    ) {
      alert("Please fill in all fields and add at least one role.");
      return;
    }

    // Create a user object
    const user = {
      name: name,
      email: email,
      password: password,
      roles: roles,
    };

    // Display the user details (for now, just log to the console)
    console.log("User Created:", user);
    alert(
      `User created successfully!\nName: ${user.name}\nEmail: ${
        user.email
      }\nRoles: ${user.roles.join(", ")}`
    );

    // Clear the form
    document.getElementById("userCreationForm").reset();
    rolesTable.innerHTML = ""; // Clear the roles table

    // You can send the user data to a backend server here
    // Example: fetch('/api/users', { method: 'POST', body: JSON.stringify(user) });
  });
