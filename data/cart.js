//model

export let cart;

loadFromStorage();


export function loadFromStorage(){

    cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){

 cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
   quantity: 2,
   deliveryOptionId: '1'
}, {

    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 1,
    deliveryOptionId: '2'
}];
}

}


function saveToStorage(){

    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addtocart(productId,orderQuantity) {

    let matchingItem;

cart.forEach((item) => {
if(productId === item.productId){
matchingItem = item;
}
});

if(matchingItem){

    matchingItem.quantity += orderQuantity;
} else{
    cart.push({
        productId: productId,
        quantity: orderQuantity,
        deliveryOptionId: '1'
    });
}

saveToStorage();
}

export function total_items(){

    let cartQuantity = 0;

cart.forEach((item) => {

    cartQuantity += item.quantity;
});

return cartQuantity;
}



export function removeFromCart(productId){

const len = cart.length;
  for(let i=0;i<len;i++){

    if(cart[i].productId===productId){

        cart.splice(i,1);
        break;
    }
  }


   saveToStorage();
}

export function updateDeliveryOption(productId,deliveryOptionId){

    let matchingItem;

cart.forEach((item) => {
if(productId === item.productId){
matchingItem = item;
}
});


matchingItem.deliveryOptionId =deliveryOptionId;
saveToStorage();
}