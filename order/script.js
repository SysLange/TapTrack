const supabaseUrl = 'https://enynvsqywboflqcphpkm.supabase.co';
const supabaseKey = 'sb_publishable_gj6uJi6ZxlRp7ZReynYFvQ_we71tYZX';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

const drinksGrid = document.getElementById('drinks');
let drinksData = [];

// 1. HTML-Rendering der Liste
function renderDrinks() {
  let html = `
    <div class="flex justify-around font-bold border-b pb-2">
      <span>ID</span>
      <span>Name</span>
      <span>Preis</span>
    </div>
  `;

  drinksData.forEach((drink) => {
    html += `
      <div class="flex justify-around py-1 border-b">
        <span>${drink.id}</span>
        <span>${drink.name}</span>
        <span>${drink.price}</span>
      </div>
    `;
  });

  drinksGrid.innerHTML = html;
}

// 2. Initialen Datenbestand beim Laden der Seite abfragen
async function fetchInitialDrinks() {
  const { data, error } = await supabaseClient
    .from('drinks')
    .select('*');

  if (error) {
    console.error('Fehler beim Laden der Daten:', error);
    return;
  }

  drinksData = data;
  renderDrinks();
}

// 3. Live-Verfolgung (INSERT, UPDATE, DELETE)
supabaseClient
  .channel('drinks-live')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'drinks'
    },
    (payload) => {
      console.log('Echtzeit-Änderung:', payload);

      if (payload.eventType === 'INSERT') {
        drinksData.push(payload.new);
      } else if (payload.eventType === 'UPDATE') {
        drinksData = drinksData.map((drink) => 
          drink.id === payload.new.id ? payload.new : drink
        );
      } else if (payload.eventType === 'DELETE') {
        drinksData = drinksData.filter((drink) => drink.id !== payload.old.id);
      }

      renderDrinks();
    }
  )
  .subscribe();

// Initialen Aufruf starten
fetchInitialDrinks();