const MATERIAL_SYMBOLS_URL =
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined'; 

function ensureMaterialSymbols() {
  if (document.querySelector('link[data-material-symbols]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = MATERIAL_SYMBOLS_URL;
  link.setAttribute('data-material-symbols', '1');
  document.head.appendChild(link);
}
ensureMaterialSymbols();

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
