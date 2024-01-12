import { inCart } from "./inCartOrNot.js";

const container = document.querySelector(".container");
const searchBar = document.querySelector(".search-input");

let favorite = JSON.parse(localStorage.getItem("favorite")) || [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];


const renderProducts = (container, products, page) => {
    let newProducts = products.map(({_id, name, img, alt, brand, newPrice, oldPrice, discount})=>{
        return (
        `<div class="card">
            <div class="card-img">
                <img  src="${img}" alt="${alt}">
                </div>
                <div class="card-detail">
                <span class="material-symbols-outlined delete filed" data-id="${_id}">delete</span>
                <div class="card-title">${name}</div>
                <div class="card-description">
                    <p class="card-pera">${brand}</p>
                    <code class="card-price">
                        ₹${newPrice}
                        <span class="price-line-through">₹${oldPrice}</span>
                        <span class="discount">${discount}% off</span>
                    </code>
                </div>
                <div class="btn-container">
                    <button class="btn cart-btn" data-id="${_id}">
                        <span class="material-symbols-outlined">shopping_cart</span>
                        ${inCart(cart, _id) ? (page === 'cart' ? 'Remove From Cart' : 'Go To Cart') : 'Add To Cart'}
                    </button>
                    <a class="btn-link" href="./payment.html">
                        <button class="btn buy-btn">
                            <span class="material-symbols-outlined">flash_on</span>
                            Buy now
                        </button>
                    </a>
                </div>
            </div>
        </div>`
        );
    }).join('');
    container.innerHTML = newProducts;
}

renderProducts(container, favorite, "favorite");

container.addEventListener("click", (event)=>{
    const clickedid = event.target.dataset.id;
    const currProd = favorite.filter(({_id}) => _id.toString() === clickedid);

    const isDelete = event.target.classList.contains("delete");
    if(isDelete){
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