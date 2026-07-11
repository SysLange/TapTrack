const timestamp = new Date().setHours(0, 0, 0, 0);
console.log("Timestamp: " + timestamp);

var itemList = []

window.onload = function() {
    const userName = getCookie("userIdentifier");

    if (!userName) {
        const input = prompt("Bitte geben Sie einen Namen ein:");
        
        // Wenn der Nutzer etwas eingegeben hat (nicht abbrechen gedrückt)
        if (input !== null && input.trim() !== "") {
            setCookie("userIdentifier", input, 24);
            alert("Willkommen, " + input + "! Dein Name wurde für 24h gespeichert.");
        }
    } else {
        console.log("Nutzer bereits bekannt: " + userName);
    }
};

function createItem(item_id, item_name, item_image) {
    var itemHTML = `
    <button id="${item_id}" class="relative flex aspect-square w-full flex-col items-center justify-between rounded-xl border-3 bg-neutral-400 p-1">
        <div class="absolute top-1 right-1 flex hidden h-10 w-10 items-center justify-center rounded-full border border-black bg-red-500">
            <span class="text-xl font-bold text-white">0</span>
        </div>
        <img width="1000" height="1000" class="aspect-square w-3/4 rounded-xl" src="${item_image}" />
        <span class="font-sans text-xl">${item_name}</span>
    </button>
    `;
    itemsContainer.appendChild($(itemHTML))
}

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