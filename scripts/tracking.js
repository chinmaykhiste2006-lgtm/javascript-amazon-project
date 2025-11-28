import { loadProductsFetch } from "../data/products.js";
import { getProduct } from "../data/products.js";
import { orders } from "../data/orders.js";
import { total_items} from "../data/cart.js";





   function getOrder(orderId){
    let matchingOrder;

    orders.forEach((order) => {
    
        if(orderId === order.id) matchingOrder = order;
   })
return matchingOrder;
} 

function getOrderProduct(productId, matchingOrder){

    let matchingProduct;
    matchingOrder.products.forEach((product) => {

        if(product.productId === productId) {matchingProduct = product};
    })

    return matchingProduct;
}
  
async function trackSummary(){

await loadProductsFetch();
let totalItems = total_items();

let trackingSummaryHTML = '';

const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
   const productId =  url.searchParams.get('productId');

const matchingOrder = getOrder(orderId);
const matchingOrderProduct = getOrderProduct(productId, matchingOrder);
const matchingProduct = getProduct(productId);

const formattedOrderTime = new Date(matchingOrderProduct.estimatedDeliveryTime).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long"
          });


      
    trackingSummaryHTML = `<div class="order-tracking">
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
          Quantity: ${matchingOrderProduct.quantity}
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


      document.querySelector('.main').
      innerHTML = trackingSummaryHTML;
        }

    
trackSummary();
