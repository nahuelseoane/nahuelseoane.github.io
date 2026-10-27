(() => {
    const triggers = Array.from(document.querySelectorAll('img[data-lightbox]'));
    if (!triggers.length) return;

    const lightbox = document.createElement('div');
    lightbox.className = 'media-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Enlarged media viewer');
    lightbox.innerHTML = `
        <div class="media-lightbox__panel">
            <button class="media-lightbox__close" type="button" aria-label="Close enlarged media">&times;</button>
            <img class="media-lightbox__image" alt="">
            <p class="media-lightbox__description"></p>
        </div>`;
    document.body.appendChild(lightbox);

    const closeButton = lightbox.querySelector('.media-lightbox__close');
    const enlargedImage = lightbox.querySelector('.media-lightbox__image');
    const description = lightbox.querySelector('.media-lightbox__description');
    let activeTrigger = null;
    let previousOverflow = '';

    function openLightbox(trigger) {
        activeTrigger = trigger;
        enlargedImage.src = trigger.currentSrc || trigger.src;
        enlargedImage.alt = trigger.alt;
        description.textContent = trigger.alt;
        previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        lightbox.hidden = false;
        closeButton.focus();
    }

    function closeLightbox() {
        if (lightbox.hidden) return;
        lightbox.hidden = true;
        enlargedImage.removeAttribute('src');
        document.body.style.overflow = previousOverflow;
        const triggerToRestore = activeTrigger;
        activeTrigger = null;
        triggerToRestore?.focus();
    }

    triggers.forEach((trigger) => {
        trigger.tabIndex = 0;
        trigger.setAttribute('role', 'button');
        trigger.setAttribute('aria-haspopup', 'dialog');
        trigger.setAttribute('aria-label', `Enlarge image: ${trigger.alt}`);
        trigger.addEventListener('click', () => openLightbox(trigger));
        trigger.addEventListener('keydown', (event) => {
            if (event.key !== 'Enter' && event.key !== ' ') return;
            event.preventDefault();
            openLightbox(trigger);
        });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', (event) => {
        if (lightbox.hidden) return;
        if (event.key === 'Escape') {
            closeLightbox();
        } else if (event.key === 'Tab') {
            event.preventDefault();
            closeButton.focus();
        }
    });
})();
