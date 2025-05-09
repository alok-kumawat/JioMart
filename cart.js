function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cartData")) || [];
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cart-count");
  if (cartCountEl) {
    cartCountEl.textContent = totalCount;
    cartCountEl.style.display = totalCount > 0 ? "inline-block" : "none";
  }
}

function renderCart() {
  updateCartCount()
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  let cart = JSON.parse(localStorage.getItem("cartData")) || [];

  cartItemsContainer.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const itemElement = document.createElement("div");
    itemElement.className = "cart-item d-flex align-items-center";
    itemElement.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="img-fluid cart-img me-3">
      <div class="item-details">
        <div class="item-title">${item.name}</div>
        <div class="item-price">₹${item.price.toFixed(2)}</div>
        <div class="quantity-controls">
          <button class="decrease-btn">-</button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="increase-btn">+</button>
        </div>
      </div>
      <button class="remove-btn ms-auto"><i class="bi bi-trash"></i></button>
    `;

    const decreaseBtn = itemElement.querySelector(".decrease-btn");
    const increaseBtn = itemElement.querySelector(".increase-btn");
    const removeBtn = itemElement.querySelector(".remove-btn");

    decreaseBtn.addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        
      } else {
        cart.splice(index, 1);

      }
      localStorage.setItem("cartData", JSON.stringify(cart));
      renderCart();
    });

    increaseBtn.addEventListener("click", () => {
      item.quantity++;
      localStorage.setItem("cartData", JSON.stringify(cart));
      renderCart();
    });

    removeBtn.addEventListener("click", () => {
      cart.splice(index, 1);
      localStorage.setItem("cartData", JSON.stringify(cart));
      renderCart();
    });

    cartItemsContainer.appendChild(itemElement);
  });

  cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", renderCart);
