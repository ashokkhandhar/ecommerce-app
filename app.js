import { inCart } from "./inCartOrNot.js";
import { inFavorite } from "./inFavoriteOrNot.js";

const cart = JSON.parse(localStorage.getItem("cart"));
const favorite = JSON.parse(localStorage.getItem("favorite"));

export const renderProducts = (container, products, page) => {
    let newProducts = products.map(({_id, name, img, alt, brand, newPrice, oldPrice, discount})=>{
        return (
        `<div class="card">
            <div class="card-img">
                <img  src="${img}" alt="${alt}">
                <span class="${inFavorite(favorite, _id) ? "material-symbols-outlined favorite filed" : "material-symbols-outlined favorite"}" data-id="${_id}">favorite</span>
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
        </div>`
        );
    }).join('');
    container.innerHTML = newProducts;
}

