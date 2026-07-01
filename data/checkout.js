import { cart } from './cart.js'
import { products } from "../data/products.js";
import { removeFromCart } from './cart.js';

// cart.push({
//     productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
//     quantity: 1
// },
//     {
//         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
//         quantity: 1
//     },
//     {
//         productId: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
//         quantity: 1
//     },
// {
//     productId:"54e0eccd-8f36-462b-b68a-8182611d9add",
//     quantity:1
// })


const cartItemContainer = document.getElementById('js-order-summary');
let cartItemInnerHTML = '';
let checkoutItems = 0;
cart.forEach(cartItem => {
  products.forEach(product => {
    if (product.id === cartItem.productId) {
      cartItemInnerHTML += `<div class="cart-item-container" id="js-cart-item-container-${cartItem.productId}">
                <div class="delivery-date">
                  Delivery date: Tuesday, June 21
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src=${product.image}>
    
                  <div class="cart-item-details">
                    <div class="product-name">
                      ${product.name}
                    </div>
                    <div class="product-price">
                      $${(product.priceCents / 100).toFixed(2)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary js-delete-quantity-link" data-product-id="${cartItem.productId}">
                        Delete
                      </span>
                    </div>
                  </div>
    
                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                      <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date">
                          Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date">
                          Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date">
                          Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                          $9.99 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>`;
      checkoutItems++;
    };

  });
});

const chechoutItemElement = document.getElementById('js-checkout-header-middle-section')
chechoutItemElement.innerText = checkoutItems + ' items';

cartItemContainer.innerHTML = cartItemInnerHTML;

document.querySelectorAll('.js-delete-quantity-link').forEach((deleteLink) => {
  deleteLink.addEventListener('click', () => {
    const productId = deleteLink.dataset.productId;
    removeFromCart(productId);
    const cartItemElement = document.getElementById(`js-cart-item-container-${productId}`);
    if (cartItemElement) {
      cartItemElement.remove();
      checkoutItems--;
      chechoutItemElement.innerText = checkoutItems + ' items';
    };
  });
});

