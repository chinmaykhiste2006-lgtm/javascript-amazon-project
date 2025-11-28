export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {

if(!order) return;

orders.unshift(order);
saveToStorage();
console.log(orders);
}

function saveToStorage() {

    localStorage.setItem('orders', JSON.stringify(orders));
}

