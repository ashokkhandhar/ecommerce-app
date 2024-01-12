import { inFavorite } from "./inFavoriteOrNot.js";

const container = document.querySelector(".products-container");
const searchBar = document.querySelector(".search-input");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorite = JSON.parse(localStorage.getItem("favorite")) || [];

const itemCount = document.querySelector(".item-count");
const productPrice = document.querySelector(".product-price");
const discountedAmount = document.querySelectorAll(".discounted-amount");
const totalAmount = document.querySelector(".total-amount");

let totalItems = cart.length;
let sumofOldPrice = 0;
let sumofDiscount = 0;
let total = 50;

const bill = ()=>{
    for(let i = 0; i < cart.length; i++){
        sumofOldPrice += cart[i].oldPrice;
        sumofDiscount += Math.floor(cart[i].oldPrice*cart[i].discount/100);
        total += sumofOldPrice - sumofDiscount;
    }
    if(cart.length == 0){
        sumofDiscount = sumofOldPrice = total = 0;
    }
    itemCount.innerHTML = totalItems;
    productPrice.innerHTML = sumofOldPrice;
    discountedAmount[0].innerHTML = sumofDiscount;
    discountedAmount[1].innerHTML = sumofDiscount;
    totalAmount.innerHTML = total;
}
bill();

const renderProducts = (container, products) => {
    let newProducts = products.map(({_id, name, img, alt, brand, newPrice, oldPrice, discount})=>{
        return (
        `<div class="card">
            <span class="material-symbols-outlined delete filed" data-id="${_id}">delete</span>
            <div class="card-img">
                <img  src="${img}" alt="${alt}">
            </div>
            <div class="card-detail">
                <div class="card-title">${name}</div>
                <div class="card-description">
                    <p class="card-pera">${brand}</p>
                    <code class="card-price">
                        ₹${newPrice}
                        <span class="price-line-through">₹${oldPrice}</span>
                        <span class="discount">${discount}% off</span>
                    </code>
                </div>
                <button class="btn favorite-btn" data-id="${_id}">
                    ${inFavorite(favorite, _id) ? 'Go To favorite' : 'Save for Later'}
                </button>
            </div>
        </div>`
        );
    }).join('');
    container.innerHTML = newProducts;
}

renderProducts(container, cart);

container.addEventListener("click", (event)=>{
    const clickedid = event.target.dataset.id;
    const currProd = cart.filter(({_id}) => _id.toString() === clickedid);

    const isDelete = event.target.classList.contains("delete");
    if(isDelete){
        cart = cart.filter(({_id}) => _id.toString() !== clickedid);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderProducts(container, cart);
        bill();
    }
    
    const isFavorite = event.target.classList.contains("favorite-btn");
    if(isFavorite){
        if(!inFavorite(favorite, clickedid)){
            favorite = [...currProd, ...favorite];
            event.target.innerHTML = 'Go to Favorite';
            localStorage.setItem("favorite", JSON.stringify(favorite));
        }
        else {
            location.href = "favorite.html";
        }
    }
});

searchBar.addEventListener("keyup", (event)=>{
    const searchedName = event.target.value.toLowerCase();
    if(searchedName.trim().length > 0){
        const searchedProducts = cart.filter(({name})=> {
            const nameInLower = name.toLowerCase();
            return nameInLower.includes(searchedName);
        });
        renderProducts(container, searchedProducts);
    }
});

window.addEventListener("scroll", () => {
    const priceContainer = document.querySelector(".price-container");
    if (window.scrollY >= 60) {
        priceContainer.classList.add("fixed-price-container");
    } else {
        priceContainer.classList.remove("fixed-price-container");
    }
});