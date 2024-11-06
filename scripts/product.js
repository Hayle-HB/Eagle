document.addEventListener("DOMContentLoaded", () => {
  const categoryButtonsContainer = document.getElementById("categoryButtons");
  const productList = document.getElementById("productList");
  const loader = document.querySelector(".loader");
  // Fetch products from the backend

  loader.style.display = "block";
  fetch("http://localhost:1000/products")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      return response.json();
    })
    .then((data) => {
      // Log the data for debugging
      console.log(data);
      loader.style.display = "none";
      // Directly assume the data is an array
      const products = data.data || []; // Assuming 'data' holds the 'data' field with the products
      console.log(products);

      if (products.length === 0) {
        displayNoProductsMessage();
        return;
      }

      // Extract unique categories
      const categories = [
        "All Products",
        ...new Set(products.map((product) => product.category)),
      ];

      // Populate category buttons
      categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.classList.add("category-button");
        button.setAttribute("data-category", category);
        categoryButtonsContainer.appendChild(button);

        // Add click event for filtering products
        button.addEventListener("click", () => {
          // Remove active class from all buttons
          resetButtonStyles();

          // Add active class to clicked button
          button.classList.add("active");

          // Filter products based on selected category
          const filteredProducts =
            category === "All Products"
              ? products
              : products.filter((product) => product.category === category);

          // Display products based on category
          displayProducts(filteredProducts);

          // Display another category based on the 'from' attribute
          displayFromCategory(filteredProducts);
        });
      });

      // Display all products initially
      displayProducts(products);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
      displayErrorMessage("Failed to load products. Please try again later.");
    });

  // Function to display products in the product list
  function displayProducts(products) {
    productList.innerHTML = ""; // Clear previous products
    products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      // Handle image URL: If imageUrl is null or invalid, use a default image
      const imageUrl = product.imageUrl
        ? product.imageUrl
        : "../assets/logo.png"; // Default image if no image URL

      productItem.innerHTML = `
        <img src="${imageUrl}" alt="${product.name}" class="product-image" />
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>Category: ${product.category}</p>
        <p class="price">Price: $${product.price}</p>
        <a href="/add-to-cart/${product._id}" class="add-to-cart-button">
          <img src="../assets/cart.svg" alt="Add to Cart" class="cart-icon" />
        </a>
      `;
      productList.appendChild(productItem);
    });
  }

  // Display another category based on the 'from' attribute
  function displayFromCategory(products) {
    // Extract unique 'from' values for the matched category
    const fromCategories = [
      ...new Set(products.map((product) => product.from)),
    ];

    // Display these 'from' categories under the matched category
    const fromCategoryContainer = document.getElementById("fromCategories");
    fromCategoryContainer.innerHTML = ""; // Clear previous 'from' categories

    fromCategories.forEach((fromCategory) => {
      const fromButton = document.createElement("button");
      fromButton.textContent = fromCategory;
      fromButton.classList.add("from-category-button");
      fromButton.setAttribute("data-from", fromCategory);
      fromCategoryContainer.appendChild(fromButton);

      // Add active class to the first 'from' category
      if (fromCategories.indexOf(fromCategory) === 0) {
        fromButton.classList.add("active");
      }

      // Add click event for filtering products by 'from' attribute
      fromButton.addEventListener("click", () => {
        // Remove active class from all 'from' buttons
        resetFromButtonStyles();

        // Add active class to clicked 'from' button
        fromButton.classList.add("active");

        // Filter products based on 'from' attribute
        displayProducts(
          products.filter((product) => product.from === fromCategory)
        );
      });
    });
  }

  // Display a message if no products are available
  function displayNoProductsMessage() {
    productList.innerHTML = `<p>No products available.</p>`;
  }

  // Display an error message
  function displayErrorMessage(message) {
    productList.innerHTML = `<p class="error">${message}</p>`;
  }

  // Reset styles of all category buttons
  function resetButtonStyles() {
    const buttons = document.querySelectorAll(".category-button");
    buttons.forEach((button) => {
      button.classList.remove("active"); 
    });
  }

  // Reset styles of all 'from' category buttons
  function resetFromButtonStyles() {
    const fromButtons = document.querySelectorAll(".from-category-button");
    fromButtons.forEach((button) => {
      button.classList.remove("active"); // Remove active class from all 'from' buttons
    });
  }
});
