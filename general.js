function findPageByName(pageKey) {
  const user = JSON.parse(localStorage.getItem("user"));
  let groups = user.groups;
  // Iterate through each group in the groups array
  for (const group of groups) {
    // Iterate through each page in the current group's pages array
    for (const page of group.pages) {
      // Check if the current page's page_name matches the pageKey
      if (page.page_name === pageKey) {
        return true; // Return true if a match is found
      }
    }
  }
  return false; // Return false if no match is found after searching all groups and pages
}

function checkUserExists(userKey) {
  const user = localStorage.getItem(userKey);

  if (user) {
    const userData = JSON.parse(user); // Parse the stored string into an object
    return true; // Check if the user ID matches
  }

  return false; // User does not exist
}

if (!checkUserExists("user")) {
  goToPage("login.html");
}

function buildNavbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  let groups = user.groups;
  console.log(groups);
  const navList = document.getElementById("nav-list");

  // Clear any existing content in the nav list
  navList.innerHTML = "";

  // Add a static "Home" link
  const homeLink = document.createElement("li");
  homeLink.innerHTML = `<a href="./homePage.html" class="nav-link">Home</a>`;
  navList.appendChild(homeLink);

  // Iterate through each group and its pages
  groups.forEach((group) => {
    group.pages.forEach((page) => {
      // Create a list item for each page
      const listItem = document.createElement("li");
      // <li><a href="./userList.html" class="nav-link">Display Users</a></li>
      listItem.innerHTML = `<a href="./${page.html_page}.html" class="nav-link">${page.page_display_name}</a>`;
      navList.appendChild(listItem);
    });
  });
}

// buildNavbar();

window.addEventListener("load", async () => {
  buildNavbar();
});
