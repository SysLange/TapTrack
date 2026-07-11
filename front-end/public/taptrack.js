var itemsContainer = document.getElementById("items");
console.log("taptrack.js loaded");

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