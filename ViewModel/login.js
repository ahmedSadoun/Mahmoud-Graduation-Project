// script.js
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get input values
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Basic validation
    if (username.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    // Simulate a successful login
    console.log("Username:", username);
    console.log("Password:", password);
    alert("Login successful!");
    // You can redirect the user to another page here, e.g., window.location.href = 'dashboard.html';
  });
