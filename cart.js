document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
  
    let cart = JSON.parse(localStorage.getItem("cartData")) || [];
  
    function renderCart() {
      cartContainer.innerHTML = "";
      let total = 0;
  
      if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
        cartTotal.textContent = "Total: ₹0.00";
        return;
      }
  
      cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
  
        const div = document.createElement("div");
        div.className = "d-flex justify-content-between align-items-center border-bottom py-2";
        div.innerHTML = `
          <div>
            <strong>${item.name}</strong><br>
            ₹${item.price} × 
            <input type="number" min="1" value="${item.quantity}" data-index="${index}" class="form-control d-inline-block quantity" style="width: 60px;">
          </div>
          <div>
            ₹${itemTotal.toFixed(2)}
            <button class="btn btn-sm btn-danger ms-2 remove" data-index="${index}">Remove</button>
          </div>
        `;
        cartContainer.appendChild(div);
      });
  
      cartTotal.textContent = `Total: ₹${total.toFixed(2)}`;
    }
  
    cartContainer.addEventListener("input", (e) => {
      if (e.target.classList.contains("quantity")) {
        const index = e.target.dataset.index;
        cart[index].quantity = parseInt(e.target.value);
        localStorage.setItem("cartData", JSON.stringify(cart));
        renderCart();
      }
    });
  
    cartContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove")) {
        const index = e.target.dataset.index;
        cart.splice(index, 1);
        localStorage.setItem("cartData", JSON.stringify(cart));
        renderCart();
      }
    });
  
    renderCart();
  });
  