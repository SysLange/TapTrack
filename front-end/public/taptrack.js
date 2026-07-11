let itemList = [];

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
            itemList.forEach(i => createItem(i.id, i.name, i.image));

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

function createItem(item_id, item_name, item_image) {
    const container = document.getElementById('itemsContainer'); 
    if (!container) return;

    const itemHTML = `
    <button onclick="handleItemClick('${item_id}')" id="${item_id}" class="relative flex aspect-square w-full flex-col items-center justify-between rounded-xl border-3 bg-neutral-400 p-1">
        <div class="absolute top-1 right-1 flex hidden h-10 w-10 items-center justify-center rounded-full border border-black bg-red-500">
            <span class="text-xl font-bold text-white">0</span>
        </div>
        <img width="1000" height="1000" class="aspect-square w-3/4 rounded-xl" src="${item_image}" />
        <span class="font-sans text-xl">${item_name}</span>
    </button>`;
    
    container.insertAdjacentHTML('beforeend', itemHTML);
}

function handleItemClick(item_id) {
    console.log(itemList);
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
