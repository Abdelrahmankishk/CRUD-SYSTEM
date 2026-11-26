# CRUD System — JavaScript

A **JavaScript-based Product Management System** that implements full CRUD operations (Create, Read, Update, and Delete) along with real-time product search. The project focuses on practicing JavaScript fundamentals, including arrays of objects, DOM manipulation, Local Storage, asynchronous file handling, and form validation through a fully interactive application.

## 🌐 Live Demo

[**View the Deployed Application**](https://abdelrahmankishk.github.io/CRUD-SYSTEM/)

---

## 📌 Project Overview

The CRUD System is an interactive product management application designed to demonstrate how JavaScript handles data operations and manages application state through the DOM and browser Local Storage.

The application allows users to manage product records by adding new products, displaying saved records, updating existing information, deleting products, and searching through the product collection by name.

Each product is represented as an object containing its name, price, category, description, and image. All products are maintained in a JavaScript array and persisted in Local Storage, allowing data to remain available after refreshing or reopening the application in the same browser.

JavaScript handles all application logic, including CRUD operations, search functionality, input validation, image processing, and dynamic DOM updates, while HTML and CSS provide the application structure and presentation.

## ✨ Key Features

- **Create Products:** Add new products with a name, price, category, description, and image.
- **Display Products:** Dynamically generate and display product cards using JavaScript and DOM manipulation.
- **Update Products:** Retrieve existing product information, edit its details, and save the modifications without creating duplicate records.
- **Delete Products:** Remove individual products from the collection and update the stored data.
- **Product Search:** Search products by name using case-insensitive partial matching.
- **Data Persistence:** Store product records in browser Local Storage using JSON serialization, preserving the data across page reloads.
- **Image Upload:** Select images directly from the local device instead of relying on predefined image paths within the project.
- **Image Processing:** Use the FileReader API to convert selected images into Base64 Data URLs before storing them with product records.
- **Image Replacement:** Preserve an existing product image during updates or replace it with a newly selected image.
- **Form Validation:** Validate product information using regular expressions and JavaScript validation functions.
- **Storage Error Handling:** Handle Local Storage failures, including storage capacity limitations.

## 🛠️ Technologies & Tools

| Technology | Purpose |
|---|---|
| JavaScript (ES6+) | CRUD operations, application logic, arrays, objects, DOM manipulation, and event handling |
| HTML5 | Structuring the product form and dynamically displayed product collection |
| CSS3 | Custom styling, animations, transitions, and responsive layouts |
| Bootstrap 5 | Grid system, form controls, validation states, and responsive utility classes |
| Local Storage | Persisting product records in the browser |
| FileReader API | Reading uploaded images and converting them into Data URLs |
| JSON | Serializing and deserializing product data for Local Storage |
| Regular Expressions | Validating product names, prices, categories, and descriptions |
| Font Awesome | Interface icons |
| GitHub Pages | Hosting and deploying the application |

## 💡 Technical Highlights

This project demonstrates practical use of JavaScript concepts and browser APIs:

- Implementing Create, Read, Update, and Delete operations using a JavaScript array of product objects.
- Using array methods such as `push()`, `splice()`, and indexed access to manage product records.
- Persisting application data using `localStorage.setItem()` and restoring it with `localStorage.getItem()`.
- Using `JSON.stringify()` and `JSON.parse()` to convert between JavaScript objects and JSON strings.
- Dynamically generating HTML content using template literals and updating the DOM through `innerHTML`.
- Separating product-card generation from the main rendering function using reusable functions.
- Implementing real-time search using `toLowerCase()` and `includes()` for case-insensitive filtering.
- Managing the update process by tracking the selected product's array index and reusing the product form.
- Using JavaScript Regular Expressions to validate user input.
- Implementing asynchronous functions with `async/await` to handle image processing.
- Using the FileReader API and `readAsDataURL()` to process uploaded images without requiring predefined repository image paths.
- Handling asynchronous file-reading errors and Local Storage capacity exceptions.
- Preserving existing product images when updating other product information.
- Updating the interface dynamically without reloading the page.


## ⚠️ Data Storage

The application uses browser Local Storage to persist product information, including uploaded images.

Product data is stored locally in the browser and is not synchronized between different devices or browsers. Uploaded images are converted into Data URLs and stored as part of their corresponding product records.

The application supports JPG/JPEG and PNG images with a maximum file size of 1 MB per image.

---

**Status:** Completed and deployed using GitHub Pages.
