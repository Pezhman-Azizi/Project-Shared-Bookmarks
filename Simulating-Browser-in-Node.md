# Simulating a Browser Environment in Node.js with JSDOM

## Introduction

When working with JavaScript, many scripts rely on browser-specific objects such as `window`, `document`, and `navigator`. However, when running JavaScript inside **Node.js**, these objects are **not available by default**, which can cause errors.

To solve this, I use **JSDOM**, a JavaScript library that simulates a **browser-like environment** inside Node.js.

---

## Why Do I Need JSDOM?

### Problem:
- Running `node script.js` in **Node.js** causes an error:

  ```sh
  ReferenceError: document is not defined
  ```

- This happens because **Node.js does not have a built-in `document` or `window` object**.
- Browser-specific functions like `document.getElementById()` or `window.onload` **will not work** inside Node.js.

### Solution:
- **JSDOM creates a virtual DOM** inside Node.js, allowing me to use `document`, `window`, and other browser APIs.

---

## Installing JSDOM
To use JSDOM, I install it via npm:
```sh
npm install jsdom
```

---

## Setting Up a Virtual DOM in Node.js
To make Node.js behave like a browser, I need to create a **virtual DOM** using JSDOM.

### Example Code:
```js
import { JSDOM } from "jsdom";

// Create a virtual DOM environment
const dom = new JSDOM(`<!DOCTYPE html><html><body></body></html>`);

global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

// Now I can use document like in a real browser
const body = document.querySelector("body");
body.innerHTML = "Hello, JSDOM!";

console.log(document.body.innerHTML); // Output: Hello, JSDOM!
```

### What This Code Does:
1. **Creates a virtual DOM** using `JSDOM()`.
2. **Assigns the virtual DOM to global variables** so `document`, `window`, and `navigator` behave like in a real browser.
3. **Now, browser-based JavaScript will work inside Node.js**.

---

## Running My Script
After setting up JSDOM, I can run my JavaScript file in Node.js:
```sh
node script.js
```
My browser-based JavaScript will now work inside **VS Code** and **Node.js** without errors!

---

## Key Takeaways
✔ **JSDOM allows Node.js to simulate a browser environment.**
✔ **It enables `document`, `window`, and `navigator` inside Node.js.**
✔ **I can now run JavaScript that depends on the DOM inside VS Code!**

---

## Troubleshooting
If I get errors like `document is not defined`, I ensure:
- JSDOM is installed (`npm install jsdom`).
- I am using `import { JSDOM } from "jsdom";` instead of `require()` if working with ES Modules.

---

🚀 Now I can write and test my browser-based JavaScript **inside Node.js** without needing a real browser! 🎉

