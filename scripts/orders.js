import {orders} from "../data/orders.js";
import { formatCurrency } from "./utils/money.js"
import { getProduct } from '../data/products.js';
import { loadProductsFetch } from "../data/products.js";
import { total_items} from "../data/cart.js";
let ordersGridHTML = '';

loadProductsFetch().then(()=> {



    orders.forEach((order) => {
    
        const formattedOrderTime = new Date(order.orderTime).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long"
          });
          
     
          
        
        let ordersHTML = '';
    
    order.products.forEach((product) => {

        const formattedDeliveryTime = new Date(product.estimatedDeliveryTime).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long"
          });
    
        let matchingProduct = getProduct(product.productId);
        
      ordersHTML+=
        `
                    <div class="product-image-container">
                      <img src="${matchingProduct.image}">
                    </div>
        
                    <div class="product-details">
                      <div class="product-name">
                        ${matchingProduct.name}
                      </div>
                      <div class="product-delivery-date">
                        Arriving on: ${formattedDeliveryTime}
                      </div>
                      <div class="product-quantity">
                        Quantity: ${product.quantity}
                      </div>
                      <button class="buy-again-button button-primary">
                        <img class="buy-again-icon" src="images/icons/buy-again.png">
                        <span class="buy-again-message">Buy it again</span>
                      </button>
                    </div>
        
                    <div class="product-actions">
                      <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
                        <button class="track-package-button button-secondary">
                          Track package
                        </button>
                      </a>
                    </div>
        
                   `
    });
    
    
    ordersGridHTML+=`
     <div class="order-container">
              
              <div class="order-header">
                <div class="order-header-left-section">
                  <div class="order-date">
                    <div class="order-header-label">Order Placed:</div>
                    <div>${formattedOrderTime}</div>
                  </div>
                  <div class="order-total">
                    <div class="order-header-label">Total:</div>
                    <div>$${formatCurrency(order.totalCostCents)}</div>
                  </div>
                </div>
    
                <div class="order-header-right-section">
                  <div class="order-header-label">Order ID:</div>
                  <div>${order.id}</div>
                </div>
              </div>
               <div class="order-details-grid">
               ${ordersHTML}
              </div>
    `
    
    });

 
    document.querySelector('.cart-quantity').
    innerHTML = `${total_items()}`;
    

    document.querySelector('.js-order-summary').
    innerHTML = ordersGridHTML;

}).catch((error) => {

console.log('some error happened' + error);
});


console.log(orders);
