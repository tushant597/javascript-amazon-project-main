
import { cart, removeFromCart, cartToStorage } from '.././cart.js';
import { product } from "../../data/products.js";
import { delivaryinfo } from '.././deliverydateoptions.js';
import { priceCent } from '.././priceCentFunction.js';


export function renderOrderSummary() {
  let totalPriceOfItems = 0;
  let shippingCost = 0;
  cart.forEach(cartItem => {
    let matchingProduct = product(cartItem);
    totalPriceOfItems += matchingProduct.priceCents * cartItem.quantity;
    delivaryinfo.forEach(info => {
      if (info.id === cartItem.deliveryOptionId) {
        shippingCost += info.priceCents;
      }
    });
  });


  const totalBeforeTax = totalPriceOfItems + shippingCost;
  const estimatedTax = totalBeforeTax * 0.1;
  const orderTotal = totalBeforeTax + estimatedTax;

  const paymentHTML = `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${localStorage.getItem('checkoutItems')
            
            }):</div>
            <div class="payment-summary-money">$${priceCent(totalPriceOfItems)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${priceCent(shippingCost)} </div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${priceCent(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${priceCent(estimatedTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${priceCent(orderTotal)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        `

  document.querySelector('.js-payment-summary').innerHTML = paymentHTML;
}
