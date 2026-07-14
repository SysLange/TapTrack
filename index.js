window.onload = function() {
    if (getCookie("menu")) {
        window.location.href = "/order";
    }
}

async function submitCode() {
    var input_code = document.getElementById("input_code");
    var code = input_code.value.trim();

    var data = await getData(code);
    if (data === null) {
        return;
    }
    setCookie("menu", data, 24);
    window.location.href = "order";
}

async function getData(code) {
    var errorElement = document.getElementById("error");
    errorElement.classList.add("hidden");

    try {
        const response = await fetch('src/data/' + code + '.json');

        if (!response.ok) {
            errorElement.classList.remove("hidden");
            return null;
        }
        
        return await response.json();

    } catch (error) {
        errorElement.classList.remove("hidden");
        return null;
    }
}

function setCookie(name, value, hours) {
    value = JSON.stringify(value);
    document.cookie = name + "=" + (value || "") + "; max-age=" + (hours * 60 * 60) + "; path=/";
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