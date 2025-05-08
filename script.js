// Wait for DOM to fully load
const products = [
    {
      id: 1,
      name: "Headphones Wireless",
      price: 49.99,
      image: "images/products/headphoneswireless.png"
    },
    {
      id: 2,
      name: "Gaming Headphone",
      price: 59.99,
      image: "images/products/gamingheadphones.png"
    },
    {
      id: 3,
      name: "Headphones with Mic",
      price: 39.99,
      image: "images/products/micheadphones.png",
      isNew: true
    },
    {
      id: 4,
      name: "Galaxy Tab Tablet",
      price: 499.99,
      image: "images/products/galaxytab.png"
    },
    {
      id: 5,
      name: "Galaxy Tab Tablet",
      price: 499.99,
      image: "images/products/galaxytab.png"
    },
    {
      id: 6,
      name: "Galaxy Tab Tablet",
      price: 499.99,
      image: "images/products/galaxytab.png"
    },
    {
      id: 7,
      name: "Galaxy Tab Tablet",
      price: 499.99,
      image: "images/products/galaxytab.png"
    },
    {
      id: 8,
      name: "Galaxy Tab Tablet",
      price: 499.99,
      image: "images/products/galaxytab.png"
    },
    {
      id: 9,
      name: "Galaxy Tab Tablet",
      price: 499.99,
      image: "images/products/galaxytab.png"
    }
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
    const productList = document.getElementById("product-list");
  
    if (productList) {
      products.forEach((product) => {
        const col = document.createElement("div");
        col.className = "col-md-3 col-6 mb-4";
  
        col.innerHTML = `
          <div class="card product-card" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
            <img src="${product.image}" class="card-img-top" alt="${product.name}">
            <div class="card-body">
              <h6 class="card-title">
                ${product.name} 
                ${product.isNew ? '<span class="badge badge-new">New</span>' : ''}
              </h6>
              <p class="text-muted">$${product.price}</p>
              <button class="btn btn-outline-primary btn-sm add-to-cart">Add to Cart</button>
            </div>
          </div>
        `;
  
        productList.appendChild(col);
      });
    }
  
    // Add to cart logic
    document.addEventListener("click", function (e) {
      if (e.target && e.target.classList.contains("add-to-cart")) {
        const button = e.target;
        const card = button.closest(".product-card");
        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = parseFloat(card.dataset.price);
  
        let cart = JSON.parse(localStorage.getItem("cartData")) || [];
        const existing = cart.find(item => item.id === id);
  
        if (existing) {
          existing.quantity += 1;
        } else {
          cart.push({ id, name, price, quantity: 1 });
        }
  
        localStorage.setItem("cartData", JSON.stringify(cart));
        button.textContent = "Added!";
        updateCartCount()
        button.classList.replace("btn-outline-primary", "btn-success");
  
        setTimeout(() => {
          button.textContent = "Add to cart";
          

          button.classList.replace("btn-success", "btn-outline-primary");
        }, 1200);
      }
    });


  
    // Scroll to top when clicking the brand/logo
    const logo = document.querySelector(".navbar-brand");
    if (logo) {
      logo.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    }
  
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
    const productCards = document.querySelectorAll(".product-card");
  
    searchInput?.addEventListener("input", () => {
      const searchValue = searchInput.value.toLowerCase();
      productCards.forEach(card => {
        const title = card.querySelector(".card-title").innerText.toLowerCase();
        card.parentElement.style.display = title.includes(searchValue) ? "block" : "none";
      });
    });
  
    // "Shop Now" button scrolls to trending products
    const shopNowBtn = document.querySelector(".btn-dark");
    const trendingSection = document.querySelector(".trending-title");
  
    shopNowBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      trendingSection?.scrollIntoView({ behavior: "smooth" });
    });
  });