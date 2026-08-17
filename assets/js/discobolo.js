// Google Icons
const MATERIAL_SYMBOLS_URL = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined'; 

function ensureMaterialSymbols() {
    if (document.querySelector('link[data-material-symbols]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = MATERIAL_SYMBOLS_URL;
    link.setAttribute('data-material-symbols', '1');
    document.head.appendChild(link);
}

// Font Awesome
function loadFontAwesome() {
    const existing = document.querySelector('link[data-font-awesome]');
    if (existing) return; // Already loaded

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.integrity = 'sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==';
    link.crossOrigin = 'anonymous';
    link.referrerPolicy = 'no-referrer';
    link.setAttribute('data-font-awesome', '1');

    document.head.appendChild(link);
}

function loadAllIconFonts() {
    loadFontAwesome();
    ensureMaterialSymbols();
}
loadAllIconFonts();

document.addEventListener('sidebar:ready', () => {
    const nav = document.querySelector('#sidebar nav ul.index');
    if (!nav) return;

    nav.replaceChildren();

    if (!location.pathname.endsWith('index.html') && location.pathname !== '/') {
        const li = document.createElement('li');
        li.innerHTML = `
            <a href="../index.html#top">
                <span class="material-symbols-outlined">home
            </span> Home</a>`; 
        
        nav.prepend(li);
    };
});

function replayGif(id) {
    const gif = document.getElementById(id);
    const src = gif.src;
    gif.src = '';       // Reset first
    gif.src = src;      // Re-assign to restart
};
