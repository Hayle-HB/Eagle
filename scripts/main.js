// Get the current page URL
const currentPage = window.location.pathname.split("/").pop().toLowerCase();

// Get all navigation links
const navLinks = document.querySelectorAll(".navlist a");

// Loop through each link and check for active page
navLinks.forEach((link) => {
  const linkPage = link.getAttribute("href").split("/").pop().toLowerCase();

  // Check if the link's href matches the current page and apply 'active' class
  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});
