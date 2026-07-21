import { cart, removeFromCart, cartToStorage } from '.././cart.js';
import { products } from "../../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.21/esm/index.js';
import { delivaryinfo } from '.././deliverydateoptions.js';
import { priceCent } from '.././priceCentFunction.js';
import { renderOrderSummary } from './renderOrderSummary.js';
export function renderOrderDate() {

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
  function getDeliveryDate(daysToAdd) {
    const today = dayjs();
    const deliveryDate = today.add(daysToAdd, 'day');
    return deliveryDate.format('dddd, MMMM D');
  }

  const cartItemContainer = document.getElementById('js-order-summary');
  let cartItemInnerHTML = '';
  let checkoutItems = 0;
  cart.forEach(cartItem => {
    products.forEach(product => {
      if (product.id === cartItem.productId) {
        cartItemInnerHTML += `<div class="cart-item-container" id="js-cart-item-container-${cartItem.productId}">
                <div class="delivery-date js-delivery-date-${cartItem.productId}">
                  Delivery date: ${getDeliveryDate(7)}
                </div>
    
                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src=${product.image}>
    
                  <div class="cart-item-details">
                    <div class="product-name">
                      ${product.name}
                    </div>
                    <div class="product-price">
                      ${product.getPrice(8)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${cartItem.productId}">
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
                        class="delivery-option-input js-delivery-option-input"
                        name="delivery-option-${cartItem.productId}" data-delivery-option-id="1, ${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date js-delivery-date-${cartItem.productId}">
                          ${getDeliveryDate(7)}
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input js-delivery-option-input"
                        name="delivery-option-${cartItem.productId}" data-delivery-option-id="2, ${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date js-delivery-date-${cartItem.productId}">
                          ${getDeliveryDate(3)}
                        </div>
                        <div class="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input js-delivery-option-input"
                        name="delivery-option-${cartItem.productId}" data-delivery-option-id="3, ${cartItem.productId}">
                      <div>
                        <div class="delivery-option-date js-delivery-date-${cartItem.productId}">
                          ${getDeliveryDate(1)}
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
        checkoutItemsCount(checkoutItems);
      };

    });
  });


  function checkoutItemsCount(checkoutItems) {
    localStorage.setItem('checkoutItems', checkoutItems);
  };
  const chechoutItemElement = document.getElementById('js-checkout-header-middle-section')
  chechoutItemElement.innerText = localStorage.getItem('checkoutItems') + ' items';
  checkoutItemsCount(checkoutItems);
  cartItemContainer.innerHTML = cartItemInnerHTML;

  document.querySelectorAll('.js-delete-quantity-link').forEach((deleteLink) => {
    deleteLink.addEventListener('click', () => {
      const productId = deleteLink.dataset.productId;
      removeFromCart(productId);
      const cartItemElement = document.getElementById(`js-cart-item-container-${productId}`);
      if (cartItemElement) {
        cartItemElement.remove();
        checkoutItems--;
        checkoutItemsCount(checkoutItems);
        chechoutItemElement.innerText = localStorage.getItem('checkoutItems') + ' items';
        renderOrderSummary();
      };
    });
  });

  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
    const productId = updateLink.dataset.productId;
    updateLink.addEventListener('click', () => {
      cart.forEach((cartItem) => {
        const inputHTML = '<input type="number" class="quantity-input js-quantity-input" value="' + cartItem.quantity + '" min="1">';
        if (cartItem.productId === productId) {
          const quantityLabelElement = document.querySelectorAll('.quantity-label');
          quantityLabelElement.forEach((label) => {
            if (label.closest('.cart-item-container').id === `js-cart-item-container-${productId}`) {
              label.innerHTML = inputHTML;
              label.addEventListener('keydown', (event) => {
                if (event.key === 'Enter') {
                  const newQuantity = parseInt(label.querySelector('.js-quantity-input').value);
                  if (newQuantity === 0) {
                    alert('Quantity Can not be 0')
                  } else {

                    cartItem.quantity = newQuantity;
                    cartToStorage();
                    label.innerHTML = cartItem.quantity;
                    renderOrderSummary();
                  }
                }
              });
            }
          });

        };
      });
    });
  });

  document.querySelectorAll('.js-delivery-option-input').forEach((deliveryOptionInput) => {
    const [deliveryOptionId, productId] = deliveryOptionInput.dataset.deliveryOptionId.split(', ');
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId && cartItem.deliveryOptionId === deliveryOptionId) {
        deliveryOptionInput.checked = true;
        updateDeliveryDates(cartItem.deliveryOptionId, productId);
      }
    })
  });

  document.querySelectorAll('.js-delivery-option-input').forEach((deliveryOptionInput) => {
    deliveryOptionInput.addEventListener('change', () => {
      const [deliveryOptionId, productId] = deliveryOptionInput.dataset.deliveryOptionId.split(', ');
      cart.forEach((cartItem) => {
        if (cartItem.productId === productId) {
          cartItem.deliveryOptionId = deliveryOptionId;
          cartToStorage();

          updateDeliveryDates(cartItem.deliveryOptionId, productId);
        };
      })
    })
  })


  function updateDeliveryDates(id, productId) {

    delivaryinfo.forEach((option) => {
      if (option.id === id) {
        const deliveryDatesElements = document.querySelector(`.js-delivery-date-${productId}`);
        if (id === '1') {
          deliveryDatesElements.innerText = `Delivery date: ${getDeliveryDate(option.day)}`;
          renderOrderSummary();
        } else if (id === '2') {
          deliveryDatesElements.innerText = `Delivery date: ${getDeliveryDate(option.day)}`;
          renderOrderSummary();
        } else if (id === '3') {
          deliveryDatesElements.innerText = `Delivery date: ${getDeliveryDate(option.day)}`;
          renderOrderSummary();
        };
      };
    });
  };
};