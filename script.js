const supabaseUrl = 'https://enynvsqywboflqcphpkm.supabase.co';
const supabaseKey = 'sb_publishable_gj6uJi6ZxlRp7ZReynYFvQ_we71tYZX';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

var loggedIn = false;

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        setLoggedInState(true);
    } else {
        console.log("NOT logged in");
    }
});

// Hilfsfunktion für konsistente UI-Updates
function setLoggedInState(isLoggedIn) {
    loggedIn = isLoggedIn;
    var passwordInput = document.getElementById("passwortInput");
    
    if (isLoggedIn) {
        showSuccess("Eingeloggt");
        if (passwordInput) passwordInput.disabled = true;
    }
}

async function login(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        showError("Login Fehlgeschlagen");
        return false;
    } else {
        setLoggedInState(true); // Status & UI jetzt auch hier aktualisieren!
        return true;
    }
}

async function ensureLoggedIn() {
    if (loggedIn) return true;

    var passwordInput = document.getElementById("passwortInput");
    return await login("user@ben-lange.de", passwordInput.value);
}

async function kassierenAction() {
    if (await ensureLoggedIn()) {
        console.log("redirect to Kassieren");
    }
}

async function zapfenAction() {
    if (await ensureLoggedIn()) {
        console.log("redirect to Zapfen");
    }
}

function showError(message) {
    var errorSpan = document.getElementById("fehlerSpan");
    if (errorSpan) errorSpan.textContent = message;
}

function showSuccess(message) {
    var successSpan = document.getElementById("erfolgSpan");
    if (successSpan) successSpan.textContent = message;
}