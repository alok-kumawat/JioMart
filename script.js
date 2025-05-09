const products = [
  {
    id: 1,
    name: "Headphones Wireless",
    price: 549.99,
    image: "images/products/headphoneswireless.png"
  },
  {
    id: 2,
    name: "Gaming Headphone",
    price: 2589.99,
    image: "images/products/gamingheadphones.png"
  },
  {
    id: 3,
    name: "Headphones with Mic",
    price: 1349.00,
    image: "images/products/micheadphones.png",
    isNew: true
  },
  {
    id: 4,
    name: "Galaxy Tab Tablet",
    price: 49599.00,
    image: "images/products/galaxytab.png"
  },
  {
    id: 5,
    name: "Kittle And Bottle Combo",
    price: 629.99,
    image: "images/products/kittleandbottle.png"
  },
  {
    id: 6,
    name: "Apple iPhone 16",
    price: 70490.99,
    image: "images/products/iphone.png"
  },
  {
    id: 7,
    name: "Printed Straight Kurta",
    price: 499.99,
    image: "images/products/kurta.png"
  },
];

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cartData")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = totalCount;
    cartCountEl.style.display = totalCount > 0 ? "inline-block" : "none";
  }
}

updateCartCount();

document.addEventListener("DOMContentLoaded", () => {
  const productContainers = [
    document.getElementById("product-list-1"),
    document.getElementById("product-list-2")
  ];

  productContainers.forEach((productList) => {
    if (productList) {
      products.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-md-3 col-6 mb-4";

        col.innerHTML = `
          <div class="card product-card" data-id="${product.id}">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h6 class="card-title">
                ${product.name}
                ${product.isNew ? '<span class="badge badge-new">New</span>' : ''}
              </h6>
              <p class="text-muted">₹${product.price}</p>
              <button class="btn btn-outline-primary btn-sm add-to-cart">Add to Cart</button>
            </div>
          </div>
        `;

        productList.appendChild(col);
      });
    }
  });

  // Add to cart logic
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("add-to-cart")) {
      const button = e.target;
      const card = button.closest(".product-card");
      const id = parseInt(card.dataset.id);
      const product = products.find(p => p.id === id);

      if (!product) return;

      let cart = JSON.parse(localStorage.getItem("cartData")) || [];
      const existing = cart.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
      }

      localStorage.setItem("cartData", JSON.stringify(cart));

      button.textContent = "Added!";
      button.classList.replace("btn-outline-primary", "btn-success");

      setTimeout(() => {
        button.textContent = "Add to Cart";
        button.classList.replace("btn-success", "btn-outline-primary");
      }, 1200);

      updateCartCount();
    }
  });

  // Scroll to top when clicking the brand/logo
  const logo = document.querySelector(".navbar-brand");
  logo?.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Mobile nav toggler auto-close
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  const navbarCollapse = document.getElementById("navbarNav");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navbarCollapse.classList.contains("show")) {
        new bootstrap.Collapse(navbarCollapse).toggle();
      }
    });
  });

  // Search functionality
  const searchInput = document.querySelector("input[type='search']");
  searchInput?.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    document.querySelectorAll(".product-card").forEach(card => {
      const title = card.querySelector(".card-title").innerText.toLowerCase();
      card.closest(".col-md-3").style.display = title.includes(searchValue) ? "block" : "none";
    });
  });

  // "Shop Now" scroll
  const shopNowBtn = document.querySelector(".btn-dark");
  const trendingSection = document.querySelector(".trending-title");
  shopNowBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    trendingSection?.scrollIntoView({ behavior: "smooth" });
  });
});
