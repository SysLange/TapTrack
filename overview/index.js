var order = {}

window.onload = function() {
    // Get menu from cookies
    order = getCookie("order");
    price = getCookie("price");
    menu = getCookie("menu");

    // Update the price label with the total price
    var priceLabel = document.getElementById("price");
    priceLabel.textContent = (price / 100).toFixed(2).replace('.', ',') + " €";

    // If menu is not set, redirect to home page
    if (!menu) {
        window.location.href = "/";
    }

    // Create item buttons for each item in the order
    for (const item in order) {
        if (order[item] > 0) {
            createItem(item, order[item]);
        }
    }
}

function createItem(item_name, item_qty) {
    const container = document.getElementById('orderContainer'); 
    if (!container) return;

    const itemHTML = `
    <div class="flex items-center justify-between py-2">
        <span class="font-sans text-xl font-medium text-shadow-lg">${item_name}</span>
        <span class="font-sans text-xl font-bold text-shadow-lg">${item_qty}</span>
    </div>
    <div class="h-px bg-neutral-300"></div>
    `;
    
    container.insertAdjacentHTML('beforeend', itemHTML);
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieString = parts.pop().split(';').shift();
        try {
            return JSON.parse(cookieString);
        } catch (e) {
            return null;
        }
    }
}