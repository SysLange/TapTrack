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

    let params = new URLSearchParams(document.location.search);
    const total = params.get("total");
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
    <div class="flex flex-row items-center justify-between gap-5 rounded-xl bg-neutral-50 p-5 shadow-sm inset-shadow-sm">
        <span class="font-sans text-xl">${item_name}</span>
        <span class="font-sans text-2xl font-bold">${item_qty}x</span>
    </div>`;
    
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