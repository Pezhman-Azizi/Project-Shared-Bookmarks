// This is a placeholder file which shows how you can access functions defined in other files.
// It can be loaded into index.html.
// You can delete the contents of the file once you have understood how it works.
// Note that when running locally, in order to open a web page which uses modules, you must serve the directory over HTTP e.g. with https://www.npmjs.com/package/http-server
// You can't open the index.html file using a file:// URL.

// Import JSDOM to simulate a browser environment in Node.js
import { JSDOM } from "jsdom";
// Import the getUserIds function from storage.js to retrieve user IDs
import { getUserIds } from "./storage.js";

// -----------------------------------------------------------------------------------

// Create a virtual DOM environment using JSDOM
const dom = new JSDOM(`<!DOCTYPE html><body></body>`);

// Assign the virtual DOM objects to global variables
// This makes Node.js behave like a browser
global.window = dom.window; // Assigns window object
global.document = dom.window.document; // Assigns document object
global.navigator = dom.window.navigator; // Assigns navigator object

// -----------------------------------------------------------------------------------

const userSelect = document.getElementById("user-select");

