import { loadProductsFetch } from "../data/products.js";
import { getProduct } from "../data/products.js";
import { orders } from "../data/orders.js";
import { total_items } from "../data/cart";
import { cart } from "../data/cart.js";


let trackingSumarryHTML = '';

   function getOrder(orderId){
    let matchingOrder;

    orders.forEach((order) => {
    
        if(orderId === order.id) matchingOrder = order;
   })
return matchingOrder;
} 
  
async function trackSummary(){

await loadProductsFetch();

const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
   const productId =  url.searchParams.get('productId');

const matchingProduct = getProduct(productId);
const matchingOrder = getOrder(orderId);



const formattedOrderTime = new Date(matchingOrder.orderTime).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long"
          });

  
      
    trackingSumarryHTML = `<div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formattedOrderTime}
        </div>

        <div class="product-info">
          ${matchingProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${matchingProduct.quantity}
        </div>

        <img class="product-image" src="${matchingProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>`;

      document.querySelector('.cart-item').
      innerHTML = `${total_items}`;

      document.querySelector('.main').
      innerHTML = trackingSummaryHTML;
        }

        try{
            trackSummary();
        } catch(error) {

            console.log(`error. ${error}`);
        }
       
console.log(orderId);
console.log(productId);