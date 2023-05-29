//Contact Us Actions
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
//cart actions
document.addEventListener("DOMContentLoaded", function () {
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartBtn = document.querySelector(".fa-shopping-cart");
  const closeBtn = document.querySelector(".close-btn");
  const cartHider = document.querySelector(".cart-hider-div");

  // showCart
  function showCart() {
    cartOverlay.classList.add("showCart");
  }

  function hideCart() {
    cartOverlay.classList.remove("showCart");
  }

  cartBtn.addEventListener("click", showCart);
  closeBtn.addEventListener("click", hideCart);
  cartHider.addEventListener("click", hideCart);

  const cartTotal = document.querySelector(".cart-total");
  const cartContent = document.querySelector(".cart-content");

  // Initialize cart data
  let cartItems = [];
  let total = 0;

  // Function to update the cart total
  function updateCartTotal() {
    total = cartItems.reduce((acc, item) => acc + item.price, 0);
    cartTotal.textContent = total.toFixed(2);
  }

  // Function to check if a product already exists in the cart
  function isProductInCart(productTitle) {
    return cartItems.some((item) => item.title === productTitle);
    
  }

  // Function to add a product to the cart
  function addToCart(product) {
    const { title, price, img } = product;
    const existingItem = cartItems.find((item) => item.title === title);

    if (!existingItem) {
      cartItems.push({ title, price, img });
      let results = `
      <div class="cart-img-container">
      <img src="${img}" alt="" />
      </div>
    <div class="cart-description-container">
      <div class="cart-product-title">
        <p>Product: <span class="product-title-innerCart">${title}</span></p>
      </div>
      <div class="cart-product-price">
        <p>Price: <span class="product-price-innerCart"></span>${price}$</p>
      </div>
    </div>
    <br>
      `;
     cartContent.insertAdjacentHTML('beforeend', results);
    }

    updateCartTotal();
  }
  
  function clearCart() {
    cartItems = []; 
    cartContent.innerHTML = "";
    updateCartTotal(); 
  }
  
  const checkOutBtn = document.querySelector(".checkout-btn");
  checkOutBtn.addEventListener("click", clearCart);

  // Add event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".bi-cart-plus");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      showCart();
      const productContainer = this.closest(".single-product-container");
      const imageElement = productContainer.querySelector(".product-img img"); // Select the image within the product container
      const productImg = imageElement.getAttribute("src");
      const productTitle =
        productContainer.querySelector(".product-title h5").textContent;
      const productPrice = parseFloat(
        productContainer.querySelector(".product-price p").textContent.slice(1)
      );

      if (!isProductInCart(productTitle)) {
        addToCart({
          title: productTitle,
          price: productPrice,
          img: productImg,
        });
      }
    });
  });
  
});
const checkOutBtn = document.querySelector(".checkout-btn");
checkOutBtn.addEventListener("click", clearCart);

function clearCart() {
  alert("Checkout completed successfully!");
  updateCartTotal(); // Update the cart total to zero
}
