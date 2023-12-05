const arr = [];

const url = 'https://fakestoreapi.com/products'
const loadProducts = () => {
   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         arr.push(data);
         showProducts(data);
      });
};

loadProducts();

// show all product in UI
const showProducts = (products) => {
   
   setInnerText('total_products', products.length);
   document.getElementById("all-products").innerHTML = "";

   const allProducts = products.slice(0, 10).map((pd) => pd);
   for (const product of allProducts) {
      const image = product.image;
      const div = document.createElement('div');
      div.classList.add('product');
      div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $<span id="individual-price">${product.price}</span></h2>

      <button onclick="showProductDetails(${product.id})" id="details-btn"    data-bs-toggle="modal"
      data-bs-target="#exampleModal" class="btn btn-outline-secondary mb-2 rounded-1 mt-1">Details</button>
      
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success border-0 w-100 rounded-0 bg-main py-2">Add to cart</button>
      `;
      document.getElementById('all-products').appendChild(div);
   }
};

let count = 0;

const addToCart = (id, price) => {
   console.log(id,price);
   count = count + 1;
   updatePrice('price',price);
   updateTaxAndCharge();
   updateTotal();
   document.getElementById('total-Products').innerText = count;
};
const showProductDetails = (product_id) => {
   console.log(product_id);
   fetch(`https://fakestoreapi.com/products/${product_id}`)
      .then((res) => res.json())
      .then((data) => showProductDetailsInModal(data));
};

const showProductDetailsInModal = (product_details) => {
   console.log(product_details);
   
   const modalContainer = document.getElementById('modal-container');
   const modalDiv = document.createElement('div');
   modalDiv.classList.add('modal-content');
   modalDiv.innerHTML= `
      <div class="modal-header">
         <h5 class="modal-title text-success" id="exampleModalLabel">
         ${product_details.title}
         </h5>
      <button
         type="button"
         class="btn-close"
         data-bs-dismiss="modal"
         aria-label="Close"
      ></button>
      </div>
   <div class="ms-3 my-3">
      <strong> Product id:${product_details.id} <span id="productId"></span> </strong>
   </div>

   <div class="modal-body text-secondary" id="modal_body"></div>
   <div class="p-4 d-flex">
   <strong class="me-2">Rating: ${product_details.rating.rate}</strong>
   </div>
   <div class="modal-footer">
   <button
      type="button"
      class="btn btn-secondary"
      data-bs-dismiss="modal"
   >
      Close
      </button>
      </div>
      </div>
   `
   modalContainer.appendChild(modalDiv);
   modalContainer = '';
   
   // console.log(product_details.title);
   // setInnerText('exampleModalLabel', product_details.title);
   // setInnerText('product_id', `${product_details.id}`);
   // setInnerText('modal_body', product_details.description);
   // setInnerText('rating', product_details.rating.rate);
};

const getInputValue = (id) => {
   const element = document.getElementById(id).innerText;
   const converted = parseInt(element);
   return converted;
};
// main price update function
const updatePrice = (id,value) => {
   // console.log(id,value);
   const convertedOldPrice = getInputValue(id);
   console.log(convertedOldPrice);
   // console.log(productPrice);
   // const convertPrice = parseInt(productPrice);
   // console.log(convertPrice);
   const total = convertedOldPrice + value;
   setInnerText(id,total);
};

// set innerText function
const setInnerText = (id, value) => {
   document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
   const priceConverted = getInputValue('price');
   if (priceConverted > 200) {
      setInnerText('delivery-charge', 30);
      setInnerText('total-tax', priceConverted*0.2);
   }
   if (priceConverted > 400) {
      setInnerText('delivery-charge', 50);
      setInnerText('total-tax', priceConverted * 0.3);
   }
   if (priceConverted > 500) {
      setInnerText('delivery-charge', 60);
      setInnerText('total-tax', priceConverted * 0.4);
   }
};

//grandTotal update function
const updateTotal = () => {
   
   const grandTotal =
      getInputValue('price') +
      getInputValue('delivery-charge') +
      getInputValue('total-tax');
   document.getElementById('total').innerText = grandTotal;
};

// search by category
document.getElementById("search-btn").addEventListener("click", function () {
   const inputField = document.getElementById("input-value").value;
   const searchedProduct = arr[0].find((p) =>
     p.category.startsWith(`${inputField}`)
   );
   showProducts(searchedProduct);
 });


