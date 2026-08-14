const supabaseUrl = 'https://enynvsqywboflqcphpkm.supabase.co';
const supabaseKey = 'sb_publishable_gj6uJi6ZxlRp7ZReynYFvQ_we71tYZX';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);


document.addEventListener('DOMContentLoaded', async () => {
    console.log("Trigger");
});


async function login(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        showError("Login Fehlgeschlagen");
        return false;
    } else {
        return true;
    }
}


async function kassierenAction() {
    var passwordInput = document.getElementById("passwortInput");
    var loginSuccess = await login("user@ben-lange.de", passwordInput.value)

    if (loginSuccess) {
        console.log("redirect to Kassieren")
    }
}


async function zapfenAction() {
    var passwordInput = document.getElementById("passwortInput");
    var loginSuccess = await login("user@ben-lange.de", passwordInput.value)

    if (loginSuccess) {
        console.log("redirect to Zapfen")
    }
}


function showError(message) {
    var errorSpan = document.getElementById("fehlerSpan");
    errorSpan.textContent = message;
}