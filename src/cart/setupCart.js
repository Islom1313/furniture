// import
import {
    getStorageItem,
    setStorageItem,
    formatPrice,
    getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items

const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");

let cart = getStorageItem(".cart");

export const addToCart = (id) => {
    // console.log(id);
    let item = cart.find((cartItem) => cartItem.id === id);
    if (!item) {
        let product = findProduct(id);
        // add item to the cart
        product = {...product, amount: 1 };
        cart = [...cart, product];

        addToCartDOM(product);
        console.log(cart);
        // console.log(cart);
    } else {
        // update values
    }

    // add one to the item count
    displayCartItemCount();

    displayCartTotal();
    // set cart in localstorage
    setStorageItem("cart", cart);
    // display cart totals
    openCart();
};

function displayCartItemCount() {
    const amount = cart.reduce((total, currentCartItem) => {
        return (total += currentCartItem.amount);
    }, 0);
    cartItemCountDOM.textContent = amount;
}

function displayCartTotal() {
    let total = cart.reduce((total, currentCartItem) => {
        return (total += currentCartItem.price * currentCartItem.amount);
    }, 0);
    cartTotalDOM.textContent = `Total :${formatPrice(total)}`;
}

function displayCartItemsDOM() {
    cart.forEach((cartItem) => {
        addToCartDOM(cartItem);
    });
}

function setupCartFunctionality() {}

const init = () => {
    // console.log(cart);
    // display amount of cart items
    displayCartItemCount();

    // display total
    displayCartTotal();

    // add all cart items to the DOM
    displayCartItemsDOM();
    // functionality
    setupCartFunctionality();
};
init();