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

let cart = getStorageItem("cart");

export const addToCart = (id) => {
    // console.log(id);
    let item = cart.find((cartItem) => cartItem.id === id);
    if (!item) {
        let product = findProduct(id);
        // add item to the cart
        product = {...product, amount: 1 };
        cart = [...cart, product];
        addToCartDOM(product);
    } else {
        // update values
        const amount = increaseAmount(id);
        const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];

        const newAmount = items.find((value) => value.dataset.id === id);
        newAmount.textContent = amount;
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

function increaseAmount(id) {
    let newAmount;
    cart = cart.map((cartItem) => {
        if (cartItem.id === id) {
            newAmount = cartItem.amount + 1;
            cartItem = {...cartItem, amount: newAmount };
        }
        return cartItem;
    });
    return newAmount;
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