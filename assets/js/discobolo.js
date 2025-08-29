document.addEventListener('sidebar:ready', () => {
    const nav = document.querySelector('#sidebar nav ul.index');
    if (!nav) return;

    nav.replaceChildren();

    if (!location.pathname.endsWith('index.html') && location.pathname !== '/') {
        const li = document.createElement('li');
        li.innerHTML = `<a href="../index.html#top">Home</a>`;
        nav.prepend(li);
    };
});

function replayGif(id) {
    const gif = document.getElementById(id);
    const src = gif.src;
    gif.src = '';       // Reset first
    gif.src = src;      // Re-assign to restart
};
