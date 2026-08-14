const supabaseUrl = 'https://enynvsqywboflqcphpkm.supabase.co';
const supabaseKey = 'sb_publishable_gj6uJi6ZxlRp7ZReynYFvQ_we71tYZX';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);


async function login(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        showError("Login Fehlgeschlagen")
        return false;
    } else {
        alert("logged in");
        console.log("User data:", data);
        return true;
    }
}


function kassierenAction() {
    var passwordInput = document.getElementById("passwortInput");
    
}


function zapfenAction() {
}


function showError(message) {
    var errorSpan = document.getElementById("fehlerSpan");
    errorSpan.value = message;
}