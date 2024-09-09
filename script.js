const products = [
  {
    name: "Sony Playstation 5",
    url: "images/playstation_5.png",
    type: "games",
    price: 1000,
  },
  {
    name: "Samsung Galaxy",
    url: "images/samsung_galaxy.png",
    type: "smartphones",
    price: 2000,
  },
  {
    name: "Cannon EOS Camera",
    url: "images/cannon_eos_camera.png",
    type: "cameras",
    price: 4000,
  },
  {
    name: "Sony A7 Camera",
    url: "images/sony_a7_camera.png",
    type: "cameras",
    price: 5000,
  },
  {
    name: "LG TV",
    url: "images/lg_tv.png",
    type: "televisions",
    price: 6000,
  },
  {
    name: "Nintendo Switch",
    url: "images/nintendo_switch.png",
    type: "games",
    price: 7000,
  },
  {
    name: "Xbox Series X",
    url: "images/xbox_series_x.png",
    type: "games",
    price: 8000,
  },
  {
    name: "Samsung TV",
    url: "images/samsung_tv.png",
    type: "televisions",
    price: 9000,
  },
  {
    name: "Google Pixel",
    url: "images/google_pixel.png",
    type: "smartphones",
    price: 10000,
  },
  {
    name: "Sony ZV1F Camera",
    url: "images/sony_zv1f_camera.png",
    type: "cameras",
    price: 4000,
  },
  {
    name: "Toshiba TV",
    url: "images/toshiba_tv.png",
    type: "televisions",
    price: 9000,
  },
  {
    name: "iPhone 14",
    url: "images/iphone_14.png",
    type: "smartphones",
    price: 3000,
  },
];

// DOM elements and variables
const productsWrapperEl = document.getElementById("products-wrapper");
const productsEls = [];
let cartItemCount = 0;
const cartCount = document.getElementById('cartCount');
const filterContainer = document.getElementById('filters-container');
const searchInput = document.getElementById('search');
const checkEls = document.querySelectorAll('.check');
const cartButton=document.getElementById('cartButton')
// Create and append product elements
products.forEach((product) => {
  const productEl = createProductElement(product);
  productsEls.push(productEl);
  productsWrapperEl.appendChild(productEl);
});

// Add event listeners for filter input and category change
filterContainer.addEventListener('change', filterProducts);
searchInput.addEventListener('input', filterProducts);

// Create product HTML structure
function createProductElement(product) {
  const productEl = document.createElement("div");
  productEl.className = "item space-y-2";
  productEl.innerHTML = `
    <div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border">
      <img src="${product.url}" alt="${product.name}" class="w-full h-full object-cover">
      <span class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">
        Add to Cart
      </span>
    </div>
    <p class="text-xl">${product.name}</p>
    <strong>₹${product.price.toLocaleString()}</strong>
  `;
  // Add cart event listener
  productEl.querySelector('.status').addEventListener('click', addToCart);
  return productEl;
}

// Cart functionality to add or remove products
function addToCart(e) {
  const statusEl = e.target;
  if (statusEl.classList.contains('added')) {
    statusEl.classList.remove('added');
    statusEl.innerText = 'Add to Cart';
    statusEl.classList.remove('bg-red-600');
    statusEl.classList.add('bg-black');
    cartItemCount--;
  } else {
    statusEl.classList.add('added');
    statusEl.innerText = 'Remove from Cart';
    statusEl.classList.remove('bg-black');
    statusEl.classList.add('bg-red-600');
    cartItemCount++;
  }
  cartCount.innerText = cartItemCount.toString();
}

// Filter products based on search input and checked categories
function filterProducts() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const checkedCategories = Array.from(checkEls)
    .filter((check) => check.checked)
    .map((check) => check.id);  // Get ids like 'games', 'smartphones', etc.

  productsEls.forEach((productEl, index) => {
    const product = products[index];
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(product.type);

    // Show product if it matches both search term and category
    if (matchesSearchTerm && isInCheckedCategory) {
      productEl.classList.remove('hidden');
    } else {
      productEl.classList.add('hidden');
    }
  });
}
