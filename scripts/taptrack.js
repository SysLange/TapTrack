let itemList = [];
let currentOrder = {};
let total = 0;

window.onload = async function() {
    let code = getCookie("sessionCode");
    let success = false;

    while (!success) {
        if (!code) {
            const input = prompt("Bitte geben Sie Ihren Code ein:");
            
            if (!input || input.trim() === "") {
                return; 
            }
            code = input.trim();
        }

        try {
            itemList = await getData(code);
            console.log("Daten erfolgreich geladen:", itemList);
            
            setCookie("sessionCode", code, 24);
            success = true;
            itemList.forEach(i => createItem(i.id, i.name, i.image, i.price));
            itemList.forEach(i => currentOrder[i.name] = 0);
        } catch (error) {
            console.error("Fehler beim Laden:", error);
            alert("Der Code '" + code + "' ist ungültig. Bitte versuchen Sie es erneut.");
            
            code = null;
            document.cookie = "sessionCode=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
    }
};

async function getData(code) {
    const url = `https://raw.githubusercontent.com/SysLange/TapTrack/refs/heads/main/data/${code}.json`;
    const response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP Status: ${response.status}`);
    }
    return await response.json();
}

function createItem(item_id, item_name, item_image, item_price) {
    const container = document.getElementById('itemsContainer'); 
    if (!container) return;

    const itemHTML = `
    <button onclick="handleItemClick('${item_id}')" id="${item_id}" class="relative flex aspect-square w-full flex-col items-center justify-between rounded-xl bg-neutral-50 p-1 shadow-sm inset-shadow-sm">
        <div id="quantity-container-${item_id}" class="absolute top-1 right-1 flex hidden h-10 w-10 items-center justify-center rounded-full bg-green-400">
        <span id="quantity-${item_id}" class="text-xl font-bold text-white">0</span>
        </div>
        <img width="1000" height="1000" class="aspect-square w-3/4 rounded-xl" src="${item_image}" />
        <span class="font-sans text-xl">${item_name}</span>
        <span class="font-sans text-xl">Preis: ${(item_price / 100).toFixed(2).replace('.', ',') + " €"}</span>
    </button>`;
    
    container.insertAdjacentHTML('beforeend', itemHTML);
}

function handleItemClick(item_id) {
    const button = document.getElementById(item_id);
    const quantityContainer = document.getElementById(`quantity-container-${item_id}`);
    const quantitySpan = document.getElementById(`quantity-${item_id}`);
    const priceSpan = document.getElementById('price');

    const clickedItem = itemList.find(i => i.id == item_id);

    if (!clickedItem) {
        console.error("Item mit ID " + item_id + " nicht in itemList gefunden.");
        return;
    }

    button.disabled = true;
    setTimeout(function() {
        button.disabled = false;
    }, 100);

    if (quantityContainer.classList.contains('hidden')) {
        quantityContainer.classList.remove('hidden');
    }

    let currentQty = parseInt(quantitySpan.textContent);
    quantitySpan.textContent = currentQty + 1;

    total += clickedItem.price;
    priceSpan.textContent = (total / 100).toFixed(2).replace('.', ',') + " €";

    // add to current order
    currentOrder[clickedItem.name] = parseInt(quantitySpan.textContent);
    currentOrder["total"] = total;
}

function resetOrder() {
    itemList.forEach(i => {
        const quantityContainer = document.getElementById(`quantity-container-${i.id}`);
        const quantitySpan = document.getElementById(`quantity-${i.id}`);

        if (quantityContainer && quantitySpan) {
            quantityContainer.classList.add('hidden');
            quantitySpan.textContent = '0';
        }
    });

    total = 0;
    const priceSpan = document.getElementById('price');
    if (priceSpan) {
        priceSpan.textContent = (total / 100).toFixed(2).replace('.', ',') + " €";
    }
}

function confirmOrder() {
    if (total === 0) {
        return
    }
    window.location.replace("/TapTrack/order.html?total=" + total);
    setCookie("currentOrder", JSON.stringify(currentOrder), 1);
}


// COOKIES
function setCookie(name, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
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
