// This is the boilerplate code given for you
// You can modify this code
// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const clrCartBtn = document.getElementById("clear-cart-btn")
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}
renderProducts()

// Render cart list
function renderCart() {
	cartList.innerHTML="";
	let arr=[]
	if(sessionStorage.getItem("data")){
		const sessionArr = JSON.parse( sessionStorage.getItem("data"))
		arr = [...sessionArr];
		console.log(arr)
		// sessionStorage.setItem("data", JSON.stringify(arr));
	}
	products.forEach((product)=>{
		if(arr.find((id)=>id===product.id.toString())){
			 const li = document.createElement("li");
		    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}" onclick="removeFromCart(${product.id})">remove from Cart</button>`;
		    cartList.appendChild(li);
		}
	})
}

// Add item to cart
const addcardbtn = document.querySelectorAll(".add-to-cart-btn")
for (let index = 0; index < addcardbtn.length; index++) {
addcardbtn[index].addEventListener("click",(e)=>{
	addToCart(e.target.getAttribute("data-id"),e)
	// cartList.innerHTML="";
	renderCart()
})
}
function addToCart(productId,e) {
	
console.log("i am from addto cart" ,e.target)

	sessionStorage.setItem('myData', "dataString");
	let arr=[]
	if(sessionStorage.getItem("data")){
		var sessionArr = JSON.parse(sessionStorage.getItem("data"))
		if(!sessionArr.find((id)=>id===productId.toString())){
		arr = [...sessionArr,productId];
		}else{
			arr=[...sessionArr];
		}
		sessionStorage.setItem("data", JSON.stringify(arr));
		console.log(arr)
		
	}else{
		sessionStorage.setItem("data", JSON.stringify(arr));
	}
	
}

// Remove item from cart
function removeFromCart(productId) {
	console.log(productId)
	let arr = [];
	if(sessionStorage.getItem("data")){
		const sessionArr = JSON.parse(sessionStorage.getItem("data"))
		arr=sessionArr.filter((id)=>{
				return id!==productId.toString()
		})
		sessionStorage.setItem("data", JSON.stringify(arr));
	}
	console.log(arr)
	renderCart()
}

// Clear cart
clrCartBtn.addEventListener('click',()=>{
	console.log("ok")
	clearCart()
   renderCart();
})
function clearCart() {
	
	let arr=[]
	sessionStorage.setItem("data", JSON.stringify(arr));
}

// Initial render

renderCart();
