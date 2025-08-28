document.addEventListener('DOMContentLoaded', async () => {
    await loadSidebar();
    await loadFooter();
    initSidebarToggle();
    initSmoothScroll?.();
    initPortfolioHover?.();
    initDarkMode?.();

    document.dispatchEvent(new Event('sidebar:ready'));
    document.dispatchEvent(new Event('footer:ready'));
});

async function loadSidebar() {
    const ph = document.getElementById('sidebar-placeholder');
    if (!ph) return;
    const src = ph.dataset.src || 'sidebar.html';
    try {
        const res = await fetch(src);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        // replace the placeholder with the sidebar html
        ph.outerHTML = await res.text();
    } catch (e) {
        console.error('Sidebar include failed:', e)
    }
}
async function loadFooter() {
    const ph = document.getElementById('footer-placeholder');
    if (!ph) return;
    const src = ph.dataset.src || 'footer.html';
    const res = await fetch(src);
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    ph.outerHTML = await res.text();
}

function initSidebarToggle() {
    // Sidebar
    const sidebar = document.getElementById("sidebar");
    const toggle = document.getElementById("toggle-sidebar");
    const main = document.getElementById("main");
    if (!sidebar || !toggle || !main) return;

    // avoid double-binding if this runs twice
    if (toggle.dataset.bound === '1') return;
    toggle.dataset.bound = '1';

    // Sidebar toggle
    toggle.addEventListener("click", () => {
        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        if (isMobile) {
            //overlay drawer
            sidebar.classList.toggle("open");
            document.body.classList.toggle("menu-open", sidebar.classList.contains("open"));
        } else {
            // desktop push
            sidebar.classList.toggle("hidden");
            main.classList.toggle("expanded");
            document.body.classList.toggle("sidebar-closed", sidebar.classList.contains("hidden"));
        }
    });
};

function initSmoothScroll() {
    document.addEventListener('click', (e) => {
        const a = e.target.closest('nav a[href^="#"]');
        if (!a) return;
        e.preventDefault();
        const id = a.getAttribute('href').slice(1);
        const target = document.getElementById(id);
        if (target) {
            window.scrollTo({ top: target.offsetTop - 50, behavior: 'smooth' });
        }
    });
}

function initPortfolioHover() {
    const imgs = document.querySelectorAll('#portfolio .item img');
    imgs.forEach(img => {
        img.addEventListener('mouseover', () => (img.style.transform = 'scale(1.05)'));
        img.addEventListener('mouseout', () => (img.style.transform = 'scale(1)'));
    });
}

// ========== DARK MODE ==========
function initDarkMode() {
    let btn = document.getElementById('dark-mode-toggle');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'dark-mode-toggle';
        btn.textContent = 'Dark Mode';
        btn.classList.add('button');
        btn.style.position = 'fixed';
        btn.style.top = '20px';
        btn.style.right = '20px';
        document.body.appendChild(btn);
    }
    btn.addEventListener('click', () => {
        const on = document.body.classList.toggle('dark-mode');
        // btn.textContent = on ? 'Light Mode' : 'Dark Mode';
        if (document.body.classList.contains("dark-mode")) {
            document.body.style.background = "#222";
            document.body.style.color = "white";
            toggleButton.textContent = "Light Mode";
        } else {
            document.body.style.background = "#f4f4f4";
            document.body.style.color = "#333";
            toggleButton.textContent = "Dark Mode";
        }
    });
}
