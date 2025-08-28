document.addEventListener('sidebar:ready', () => {
    const nav = document.querySelector('#sidebar nav ul.index');
    if (!nav) return;

    nav.replaceChildren();

    if (!location.pathname.endsWith('index.html') && location.pathname !== '/') {
        const li = document.createElement('li');
        // const a = document.createElement('a');
        // a.href = href; a.textContent = text;
        // li.appendChild(a);
        // nav.appendChild(li);

        li.innerHTML = `<a href="../index.html#top">Home</a>`;
        nav.prepend(li);
    };
    // add('index.html#top', 'Home');
    // add('#top', 'Summary');
});

function replayGif(id) {
    const gif = document.getElementById(id);
    const src = gif.src;
    gif.src = '';       // Reset first
    gif.src = src;      // Re-assign to restart
};
