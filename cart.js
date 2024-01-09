import { renderProducts } from "./app.js";
import { inFavorite } from "./inFavoriteOrNot.js";

const container = document.querySelector(".container");
const searchBar = document.querySelector(".search-input");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let favorite = JSON.parse(localStorage.getItem("favorite")) || [];

renderProducts(container, cart, "cart");

container.addEventListener("click", (event)=>{
    const clickedid = event.target.dataset.id;
    const currProd = cart.filter(({_id}) => _id.toString() === clickedid);

    const isCartBtn = event.target.classList.contains("cart-btn");
    if(isCartBtn){
        cart = cart.filter(({_id}) => _id.toString() !== clickedid);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderProducts(container, cart, "cart");
    }
    
    const isFavorite = event.target.classList.contains("favorite");
    if(isFavorite){
        if(!inFavorite(favorite, clickedid)){
            favorite = [...currProd, ...favorite];
            event.target.classList.add("filed");
            localStorage.setItem("favorite", JSON.stringify(favorite));
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
    if(searchedName.trim().length > 0){
        const searchedProducts = cart.filter(({name})=> {
            const nameInLower = name.toLowerCase();
            return nameInLower.includes(searchedName);
        });
        renderProducts(container, searchedProducts);
    }
});