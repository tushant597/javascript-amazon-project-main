import { renderOrderDate } from './checkout/renderOrderDate.js';
import { renderOrderSummary } from './checkout/renderOrderSummary.js';
import { loadProducts } from "../data/products.js";
// import './cart-class.js';
loadProducts(() => {

    renderOrderDate();
    renderOrderSummary();
});