import { renderProducts } from "./app.js";
import { inCart } from "./inCartOrNot.js";

const container = document.querySelector(".container");
const searchBar = document.querySelector(".search-input");

let favorite = JSON.parse(localStorage.getItem("favorite")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

renderProducts(container, favorite, "favorite");

container.addEventListener("click", (event)=>{
    const clickedid = event.target.dataset.id;
    const currProd = favorite.filter(({_id}) => _id.toString() === clickedid);

    const isFavorite = event.target.classList.contains("filed");
    if(isFavorite){
        favorite = favorite.filter(({_id}) => _id.toString() !== clickedid);
        localStorage.setItem("favorite", JSON.stringify(favorite));
        renderProducts(container, favorite, "favorite");
    }
    
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
});

searchBar.addEventListener("keyup", (event)=>{
    const searchedName = event.target.value.toLowerCase();
    if(searchedName.trim().length > 0){
        const searchedProducts = favorite.filter(({name})=> {
            const nameInLower = name.toLowerCase();
            return nameInLower.includes(searchedName);
        });
        renderProducts(container, searchedProducts);
    }
});