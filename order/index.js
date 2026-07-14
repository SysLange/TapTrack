var menu = []
var order = {}
var price = 0

window.onload = function() {
    // Get menu from cookies
    menu = getCookie("menu");

    // If menu is not set, redirect to home page
    if (!menu) {
        window.location.href = "/TapTrack";
    }

    // Create item buttons for each item in the menu
    for (const item of menu) {
        createItem(item.id, item.name, item.size, "../src/" + item.image, item.price);
        order[item.name + "|" + item.size] = 0;
    }
}

function createItem(item_id, item_name, item_size, item_image, item_price) {
    // Get the container element where the item buttons will be appended
    const container = document.getElementById('itemsContainer'); 
    if (!container) return;

    // Create the item button HTML
    const itemHTML = `
    <button onClick="handleItemClick('${item_id}')" class="relative flex flex-row gap-2 rounded-xl bg-neutral-50 shadow-sm inset-shadow-sm items-center">
        <span id="quantity-${item_id}" class="hidden absolute top-0 right-0 flex h-7.5 w-7.5 items-center justify-center rounded-xl bg-red-500 text-white text-shadow-lg shadow-sm inset-shadow-sm">0</span>
        <img class="h-15 w-15 rounded-xl" src="../src/${item_image}"/>
        <div class="flex flex-col items-start justify-evenly">
            <span class="font-sans text-xl font-bold text-shadow-lg">${item_name}</span>
            <span class="font-sans text-xl font-bold text-shadow-lg">${item_size}</span>
            <span class="font-sans text-xl font-bold text-shadow-lg">${(item_price / 100).toFixed(2).replace('.', ',') + " €"}</span>
        </div>
    </button>`;

    // Append the item button to the container
    container.insertAdjacentHTML('beforeend', itemHTML);
}

function handleItemClick(item_id) {
    console.log("Item clicked: " + item_id);
    var item = menu.find(i => i.id === item_id);
    order[item.name + "|" + item.size] += 1;

    // Update the quantity display for the clicked item
    var quantityElement = document.getElementById("quantity-" + item_id);
    quantityElement.classList.remove("hidden");
    quantityElement.textContent = order[item.name + "|" + item.size];

    // update price
    price = 0;
    var priceLabel = document.getElementById("price");
    console.log("Order: ", order);
    for (const [itemName, quantity] of Object.entries(order)) {
        const [name, size] = itemName.split("|");
        const item = menu.find(i => i.name === name && i.size === size);
        price += item.price * quantity;
    }

    // Update the price label with the new total price
    priceLabel.textContent = (price / 100).toFixed(2).replace('.', ',') + " €";
}

function resetOrder() {
    for (const item of menu) {
        order[item.name + "|" + item.size] = 0;
        var quantityElement = document.getElementById("quantity-" + item.id);
        if (quantityElement) {
            quantityElement.classList.add("hidden");
            quantityElement.textContent = "0";
        }
    }
    price = 0;
    var priceLabel = document.getElementById("price");
    priceLabel.textContent = (price / 100).toFixed(2).replace('.', ',') + " €";
}

function submitOrder() {
    if (price === 0) {
        return;
    }
    
    // Store the order in cookies
    setCookie("order", order, 24);

    // Store the price in cookies
    setCookie("price", price, 24);

    // Redirect to the overview page
    window.location.href = "../overview";
}

// Get a cookie by name and parse it as JSON
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

// Set a cookie with a name, value, and expiration time in hours
function setCookie(name, value, hours) {
    value = JSON.stringify(value);
    document.cookie = name + "=" + (value || "") + "; max-age=" + (hours * 60 * 60) + "; path=/";
}

function logout() {
    cookieStore.getAll().then(cookies => cookies.forEach(cookie => {
        console.log('Cookie deleted:', cookie);
        cookieStore.delete(cookie);
    }));
    window.location.href = "/TapTrack";
}
