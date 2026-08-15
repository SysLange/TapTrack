const supabaseUrl = 'https://enynvsqywboflqcphpkm.supabase.co';
const supabaseKey = 'sb_publishable_gj6uJi6ZxlRp7ZReynYFvQ_we71tYZX';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

var loggedIn = false;

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        loggedIn = true;
        loadProducts();
    } else {
        window.location.replace("https://syslange.github.io/TapTrack");
    }
});

async function loadProducts() {
    const data = await supabaseClient.from('drinks').select('*');
    console.log(data);
}

function renderProduct() {

}