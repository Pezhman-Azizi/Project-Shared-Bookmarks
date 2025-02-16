// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// Import the getUserIds function from storage.js to retrieve user IDs
import { getUserIds } from "./storage.js";

// -----------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const userSelect = document.getElementById("user-select");

  if (!userSelect) {
    console.error("Dropdown element not found! Check index.html");
    return;
  }

  const userIds = getUserIds(); // Call the function

  console.log("User IDs fetched:", userIds); // Debugging step

  if (!userIds || userIds.length === 0) {
    console.error("No users found! Check storage.js");
    return;
  }

  // Create a default option
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select a user";
  defaultOption.disabled = true;
  defaultOption.selected = true; // Ensures it stays selected initially
  userSelect.appendChild(defaultOption);

  // Add user options
  userIds.forEach(userId => {
     const option = document.createElement("option");
     option.value = userId;
     option.textContent = `User ${userId}`;
     userSelect.appendChild(option);
  });

  console.log("Dropdown updated with users");
});
