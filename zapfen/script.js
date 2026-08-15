const supabaseUrl = 'https://enynvsqywboflqcphpkm.supabase.co';
const supabaseKey = 'sb_publishable_gj6uJi6ZxlRp7ZReynYFvQ_we71tYZX';
const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

let debounceTimeout = null;

document.addEventListener('DOMContentLoaded', async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();

    if (session) {
        subscribeToQueueChanges();
        loadQueue();
    } else {
        window.location.replace("/TapTrack");
    }

    var standSelect = document.getElementById("StandSelect");
    standSelect.addEventListener("change", loadQueue);
});

function subscribeToQueueChanges() {
    supabaseClient
        .channel('QueueChannel')
        .on(
            'postgres_changes', 
            { 
                event: '*',
                schema: 'public', 
                table: 'queue'
            }, 
            () => {
                clearTimeout(debounceTimeout);
                debounceTimeout = setTimeout(() => {
                    loadQueue();
                }, 150);
            }
        )
        .subscribe();
}

async function loadQueue() {
    var stand_id = document.getElementById("StandSelect").value;
    if (!stand_id) return;

    const { data, error } = await supabaseClient
        .from('queue')
        .select('*')
        .eq('stand_id', stand_id)
        .order('id', { ascending: true });

    if (error) {
        console.error('Fehler beim Laden der Queue:', error.message);
        return;
    }

    const queueContainer = document.getElementById("queueContainer");
    queueContainer.replaceChildren();

    for (const item of data || []) {
        renderQueueItem(item);
    }
}

function renderQueueItem(item) {
    var queueContainer = document.getElementById("queueContainer");

    const name = item.product_name || `Produkt #${item.product_id}`;

    var itemHtml = `
    <div id="${item.id}" class="flex h-15 w-full items-center justify-between rounded-full border-2 border-neutral-900 bg-neutral-300">
        <span class="mx-5 font-semibold text-neutral-900">${item.count}x</span>
        <span class="font-semibold text-neutral-900">${name}</span>
        <button onclick="finishQueue(${item.id})" class="aspect-video h-full cursor-pointer rounded-r-full border-l-2 border-neutral-900 bg-green-800">
            <span class="font-semibold text-neutral-100">Fertig</span>
        </button>
    </div>
    `;
    queueContainer.insertAdjacentHTML('beforeend', itemHtml);
}

async function finishQueue(id) {
    const { error } = await supabaseClient
        .from('queue')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Fehler beim Entfernen des Eintrags:', error.message);
    }
}