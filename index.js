import { products } from "./data.js";
import { inCart } from "./inCartOrNot.js";
import { inFavorite } from "./inFavoriteOrNot.js";

import { renderProducts } from "./app.js";

const container = document.querySelector(".container");
const searchBar = document.querySelector(".search-input");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorite = JSON.parse(localStorage.getItem("favorite")) || [];
 
// rendering items from data.js
renderProducts(container, products, "index");

// adding to cart
container.addEventListener("click", (event)=>{
    const clickedid = event.target.dataset.id;
    const currProd = products.filter(({_id}) => _id.toString() === clickedid);

    // if cart is clicked
    const isCartBtn = event.target.classList.contains("cart-btn");
    if(isCartBtn){
        if(!inCart(cart, clickedid)){
            cart = [...currProd, ...cart];
            event.target.innerHTML = `<span class='material-symbols-outlined'>shopping_cart</span> Go To Cart`;
            localStorage.setItem("cart", JSON.stringify(cart));
        }
        else{
            location.href = "cart.html";
        }
    }

    // if favorite is clicked
    const isFavorite = event.target.classList.contains("favorite");
    if(isFavorite){
        if(!inFavorite(favorite, clickedid)){
            favorite = [...currProd, ...favorite];
            event.target.classList.add("filed");
        }
        else {
            favorite = favorite.filter(({_id}) => _id.toString() !== clickedid);
            event.target.classList.remove("filed");
        }
        localStorage.setItem("favorite", JSON.stringify(favorite));
    }
});

searchBar.addEventListener("keyup", (event)=>{
    const searchedName = event.target.value.toLowerCase();
    if(searchedName.length === 0) renderProducts(container, products);
    else if(searchedName.trim().length > 0){
        const searchedProducts = products.filter(({name})=> {
            const nameInLower = name.toLowerCase();
            return nameInLower.includes(searchedName);
        });
        renderProducts(container, searchedProducts);
    }
});