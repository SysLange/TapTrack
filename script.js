const supabaseUrl = 'https://enynvsqywboflqcphpkm.supabase.co';
const supabaseKey = 'sb_publishable_gj6uJi6ZxlRp7ZReynYFvQ_we71tYZX';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

async function login(email, password) {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        alert("Login failed: " + error.message);
    } else {
        alert("logged in");
        console.log("User data:", data);
    }
}

function loginRegister() {
    var email = document.getElementById("stand").value;
    var password = document.getElementById("password").value;
    console.log(email, password);
}

function loginTap() {
    console.log("login tap")
}