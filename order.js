window.onload = async function() {
    let params = new URLSearchParams(document.location.search);
    for (const [key, value] of params) {
        if (value > 0) {
            if (key !== "total") {
                createItem(key, value);
            }
        }
    }

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