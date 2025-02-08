// script.js
document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
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
    // console.log("Username:", username);
    // console.log("Password:", password);
    let res = await logIn(username, password);
    // console.log(res.items[0]);
    if (res.items.length > 0) {
      localStorage.setItem("user", JSON.stringify(res.items[0]));
      alert("Login successful!");

      goToPage("homePage.html");
      return;
    }
    alert("Invalid username or password.");
    // You can redirect the user to another page here, e.g., window.location.href = 'dashboard.html';
  });
