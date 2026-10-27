const MATERIAL_SYMBOLS_URL = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined';

function ensureMaterialSymbols() {
    if (document.querySelector('link[data-material-symbols]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = MATERIAL_SYMBOLS_URL;
    link.setAttribute('data-material-symbols', '1');
    document.head.appendChild(link);
}

function loadFontAwesome() {
    if (document.querySelector('link[data-font-awesome]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    link.setAttribute('data-font-awesome', '1');
    document.head.appendChild(link);
}

function setMediaState(image) {
    const container = image.closest('[data-media-placeholder]');
    if (!container) return;

    const loaded = image.complete && image.naturalWidth > 0;
    container.classList.toggle('is-loaded', loaded);

    const replayButton = document.querySelector(`[data-replay-target="${image.id}"]`);
    if (replayButton) replayButton.disabled = !loaded;
}

loadFontAwesome();
ensureMaterialSymbols();

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-media-placeholder] img').forEach((image) => {
        image.addEventListener('load', () => setMediaState(image));
        image.addEventListener('error', () => setMediaState(image));
        setMediaState(image);
    });
});

document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-replay-target]');
    if (!button || button.disabled) return;

    const media = document.getElementById(button.dataset.replayTarget);
    if (!media) return;

    const source = media.currentSrc || media.src;
    media.src = '';
    media.src = source;
});

document.addEventListener('sidebar:ready', () => {
    const nav = document.querySelector('#sidebar nav ul.index');
    if (!nav) return;

    nav.innerHTML = `
        <li>
            <a href="../index.html#top">
                <span class="material-symbols-outlined" translate="no">home</span> Home
            </a>
        </li>`;
});
