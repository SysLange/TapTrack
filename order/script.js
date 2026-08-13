const supabaseUrl = 'https://enynvsqywboflqcphpkm.supabase.co';
const supabaseKey = 'sb_publishable_gj6uJi6ZxlRp7ZReynYFvQ_we71tYZX';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const drinksChannel = supabase
  .channel('drinks-live')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'drinks'
    },
    (payload) => {
      console.log('Echtzeit-Änderung:', payload)
    }
  )
  .subscribe()

const drinksGrid = document.getElementById('drinks');

let html = `
  <div class="flex justify-around">
    <span>id</span>
    <span>name</span>
    <span>price</span>
  </div>
`;