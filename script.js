// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// Import the getUserIds function from storage.js to retrieve user IDs
import { getUserIds, getData, setData } from "./storage.js";

document.addEventListener("DOMContentLoaded", () => {
  const userSelect = document.getElementById("user-select");
  const resultsList = document.getElementById("results-list");
  const form = document.querySelector("form");
  const urlInput = document.getElementById("url");
  const titleInput = document.getElementById("title");
  const descriptionInput = document.getElementById("description");

  if (!userSelect || !resultsList || !form) {
    console.error("Required elements not found! Check index.html");
    return;
  }

  // Populate dropdown with user IDs
  const userIds = getUserIds();
  userIds.forEach(userId => {
    const option = document.createElement("option");
    option.value = userId;
    option.textContent = `User ${userId}`;
    userSelect.appendChild(option);
  });

  // Function to display bookmarks for a selected user
  function displayBookmarks(userId) {
    resultsList.innerHTML = "";
    const bookmarks = getData(userId);

    if (!bookmarks || bookmarks.length === 0) {
      resultsList.innerHTML = "<li>No bookmarks available for this user.</li>";
      return;
    }

    bookmarks.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    bookmarks.forEach(bookmark => {
      const { url, title, description, timestamp } = bookmark;

      const listItem = document.createElement("li");
      const link = document.createElement("a");

      link.href = url;
      link.textContent = title;
      link.target = "_blank";

      const textNode = document.createTextNode(` - ${description} (Saved on: ${new Date(timestamp).toLocaleString()})`);

      listItem.appendChild(link);
      listItem.appendChild(textNode);
      resultsList.appendChild(listItem);
    });
  }

  // Event listener for user selection
  userSelect.addEventListener("change", () => {
    displayBookmarks(userSelect.value);
  });

  // Event listener for form submission (adds a new bookmark)
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedUserId = userSelect.value;
    if (!selectedUserId) {
      alert("Please select a user before submitting a bookmark");
      return;
    }

    const url = urlInput.value.trim();
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!url) {
      alert("URL cannot be empty");
      return;
    }

    // Validate URL format
    try {
      new URL(url);
    } catch (e) {
      alert("Invalid URL format. Please enter a valid URL.");
      return;
    }

    if (!title) {
      alert("Title cannot be empty");
      return;
    }

    if (!description) {
      alert("Description cannot be empty");
      return;
    }

    let bookmarks = getData(selectedUserId) || [];

    // Prevent duplicate bookmarks before storing
    if (bookmarks.some(bookmark => bookmark.url === url)) {
      alert("This bookmark already exists!");
      return;
    }

    const newBookmark = {
      url,
      title,
      description,
      timestamp: new Date().toISOString()
    };

    bookmarks.push(newBookmark);
    setData(selectedUserId, bookmarks);

    // Clear inputs
    urlInput.value = "";
    titleInput.value = "";
    descriptionInput.value = "";

    displayBookmarks(selectedUserId);
  });
});
