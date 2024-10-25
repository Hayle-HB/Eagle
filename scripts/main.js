// Get references to the elements
const form = document.querySelector("form");
const loaderContainer = document.getElementById("loaderContainer");
const message = document.getElementById("message");

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Show the loader and change form opacity
  loaderContainer.style.display = "block"; // Show the loader
  form.style.opacity = "0.2"; // Set form opacity to 0.5
  loaderContainer.style.opacity = "1"; // Set loader opacity to 1

  // Simulate loading time
  setTimeout(() => {
    // Hide the loader
    loaderContainer.style.display = "none";

    // Show the success message and reset form opacity
    form.style.display = "none"; // Hide the form
    message.style.display = "block"; // Show the message
  }, 5000); // 5000 ms = 5 seconds
});
