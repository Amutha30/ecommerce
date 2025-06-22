// Sample product list (replace with real API calls later)
const products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000,
    description: "High-performance laptop",
  },
  {
    id: 2,
    name: "Headphones",
    price: 2000,
    description: "Noise-cancelling headphones",
  },
  {
    id: 3,
    name: "Smartphone",
    price: 15000,
    description: "Latest Android phone",
  }
];


// Load products on homepage
if (document.getElementById("product-list")) {
  const list = document.getElementById("product-list");
  products.forEach(product => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <p>${product.description}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

// Add product to cart (prevents duplicates)
function addToCart(productId) {
  const selectedProduct = products.find(p => p.id === productId);
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const exists = cart.some(item => item.id === selectedProduct.id);
  if (exists) {
    alert("Product is already in the cart.");
    return;
  }

  cart.push(selectedProduct);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}

// Show cart items with remove button and total price
if (document.getElementById("cart-items")) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartDiv = document.getElementById("cart-items");

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const div = document.createElement("div");
      div.className = "cart-item";
      div.innerHTML = `
        <h4>${item.name} - ₹${item.price}</h4>
        <button onclick="removeFromCart(${item.id})">Remove</button>
      `;
      cartDiv.appendChild(div);
    });

    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<h3>Total: ₹${total}</h3>`;
    cartDiv.appendChild(totalDiv);
  }
}

// Remove item from cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload(); // refresh the cart page
}
