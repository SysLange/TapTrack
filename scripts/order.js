window.onload = async function() {
    var currentOrder = getCookie("currentOrder");
    if (currentOrder) {
        currentOrder = JSON.parse(currentOrder);
        for (const [key, value] of Object.entries(currentOrder)) {
            if (value > 0 && key !== "total") {
                createItem(key, value);
            }
        }
    }

    const total = getCookie("total");
    if (total) {
        const priceSpan = document.getElementById('price');
        if (priceSpan) {
            priceSpan.textContent = (total / 100).toFixed(2).replace('.', ',') + " €";
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
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}