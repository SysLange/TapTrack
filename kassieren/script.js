const supabaseUrl = 'https://enynvsqywboflqcphpkm.supabase.co';
const supabaseKey = 'sb_publishable_gj6uJi6ZxlRp7ZReynYFvQ_we71tYZX';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

var loggedIn = false;
var productList = [];
var selectedProducts = [];
var totalPrice = 0;

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        loggedIn = true;
        loadProducts();
    } else {
        window.location.replace("/TapTrack");
    }

    var standSelect = document.getElementById("StandSelect");
    console.log(standSelect.value);
});

async function loadProducts() {
    const { data } = await supabaseClient.from('drinks').select('*').order('id', { ascending: true });
    productList = data;
    for (const product of data) {
        renderProduct(product);
    }
}

function renderProduct(product) {
    var productContainer = document.getElementById("productContainer");

    const meinHTML = `
    <button id="${product.id}" class="relative flex items-center gap-5 rounded-xl border-2 border-neutral-900 bg-neutral-200 p-2.5" onclick="addSelectedProduct(${product.id})">
        <div class="absolute -top-2 -right-2 hidden h-10 w-10 items-center justify-center rounded-full border-2 border-neutral-900 bg-neutral-700">
            <span class="font-semibold text-neutral-100">0</span>
        </div>
        <img class="aspect-square h-15" src="/TapTrack/images/${product.id}.png" />
        <div class="flex flex-col items-start">
            <span class="font-semibold">${product.name}</span>
            <span class="font-semibold">${product.size}</span>
            <span class="font-semibold">${product.price.toFixed(2) + "€"}</span>
        </div>
    </button>
    `;

    productContainer.insertAdjacentHTML('beforeend', meinHTML);
}



function clearSelectedProducts() {
    selectedProducts = [];
    totalPrice = 0;

    document.getElementById("overviewList").replaceChildren();

    for (const product of productList) {
        var productButton = document.getElementById(product.id);
        var counter = productButton.querySelector("div span");
        var counterContainer = productButton.querySelector("div");

        counter.textContent = "0";
        counterContainer.classList.add("hidden");
        counterContainer.classList.remove("flex");
    }
}

function addSelectedProduct(productId) {
    var productButton = document.getElementById(productId);
    var counter = productButton.querySelector("div span");
    var counterContainer = productButton.querySelector("div");

    if (counterContainer.classList.contains("hidden")) {
        counterContainer.classList.remove("hidden");
        counterContainer.classList.add("flex");
    }

    var currentCount = parseInt(counter.textContent, 10) || 0;
    
    counter.textContent = currentCount + 1;

    let existingProduct = selectedProducts.find(product => product.id === productId);

    if (existingProduct) {
        existingProduct.count = currentCount + 1; 
    } else {
        selectedProducts.push({ id: productId, count: currentCount + 1 });
    }

    var price = productList.find(product => product.id === productId).price;
    totalPrice += price;

    console.log(totalPrice);
    console.log(selectedProducts);
}

function showSummary() {
    console.log("showSummary");
    var overviewContainer = document.getElementById("overviewContainer");
    var overviewList = document.getElementById("overviewList");
    var productContainer = document.getElementById("productContainer");
    var totalPriceSpan = document.getElementById("totalPrice");
    
    overviewContainer.classList.remove("hidden");
    
    productContainer.classList.add("hidden");

    for (const product of selectedProducts) {
        var name = productList.find(p => p.id === product.id).name;
        const listHtml = `
            <div class="flex justify-between">
                <span class="font-semibold text-neutral-900">${name}</span>
                <span class="font-semibold text-neutral-900">${product.count}</span>
            </div>
        `;
        overviewList.insertAdjacentHTML('beforeend', listHtml);
    }
    totalPriceSpan.textContent = totalPrice.toFixed(2) + "€";
}

function doneSummary() {
    var overviewContainer = document.getElementById("overviewContainer");
    var productContainer = document.getElementById("productContainer");
    var standSelect = document.getElementById("StandSelect");

    pushOrder();

    if (!standSelect.value) return alert("Bitte einen Stand auswählen!");

    overviewContainer.classList.add("hidden");

    productContainer.classList.remove("hidden");

    clearSelectedProducts();
}

function cancelSummary() {
    var overviewContainer = document.getElementById("overviewContainer");
    var productContainer = document.getElementById("productContainer");

    overviewContainer.classList.add("hidden");

    productContainer.classList.remove("hidden");

    document.getElementById("overviewList").replaceChildren();
}

function pushOrder() {
    var standId = document.getElementById("StandSelect").value;

    for (const product of selectedProducts) {
        

        productName = productList.find(p => p.id === product.id).name;
        productSize = productList.find(p => p.id === product.id).size;

        if (product.id === 999) {
            continue;
        }
        supabaseClient.from('queue').insert([
            { product_name: productName + " " + productSize, count: product.count, stand_id: standId }
        ]).then(({ data, error }) => {
            if (error) {
                console.error("Error inserting order:", error);
            } else {
                console.log("Order inserted:", data);
            }
        });
    }
}