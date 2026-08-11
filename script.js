const supabaseUrl = 'https://enynvsqywboflqcphpkm.supabase.co/rest/v1/';
const supabaseKey = 'sb_publishable_gj6uJi6ZxlRp7ZReynYFvQ_we71tYZX';
const supabase = supabase.createClient(supabaseUrl, supabaseKey);

const form = document.querySelector('form');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    
    const userName = formData.get('name');
    const userPassword = formData.get('password');

    console.log('Name submitted:', userName);
    console.log('Password submitted:', userPassword);

    const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            alert("Login failed: " + error.message);
        } else {
            alert("logged in");
            console.log("User data:", data);
    }
});