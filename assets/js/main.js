document.addEventListener('DOMContentLoaded', async () => {
    await loadSidebar();
    await loadFooter();
    initSidebarToggle();
    initSmoothScroll?.();
    initPortfolioHover?.();
    initDarkMode?.();

    // Init Formspree protections
    initFormGuards();

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
    const imgs = document.querySelectorAll('#portfolio .project img');
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
        // btn.textContent = 'Dark Mode';
        btn.classList.add('button');
        btn.style.position = 'fixed';
        btn.style.top = '20px';
        btn.style.right = '20px';
        document.body.appendChild(btn);
    }

    const mql = window.matchMedia('(max-width: 768px)');
    const place = () => {
    if (mql.matches) {
        btn.style.position = 'fixed';
        btn.style.top = '8px';
        btn.style.right = '8px';
        btn.style.fontSize = '14px';
        btn.style.padding = '6px 10px';
    } else {
        btn.style.position = 'fixed';
        btn.style.top = '20px';
        btn.style.right = '20px';
        btn.style.fontSize = '16px';
        btn.style.padding = '10px 14px';
    }
    };
    place();
    mql.addEventListener ? mql.addEventListener('change', place) : mql.addListener(place);
    let on = document.body.classList.contains('dark-mode');

    const setLabel = () => {
    btn.textContent = mql.matches
        ? (on ? 'Light' : 'Dark')         // small screens
        : (on ? 'Light Mode' : 'Dark Mode'); // larger screens
    };

    setLabel();

    btn.addEventListener('click', () => {
        // const on = document.body.classList.toggle('dark-mode');
        on = !on;
        document.body.classList.toggle('dark-mode', on);
        

        if (on) {
            document.body.style.background = "#222";
            document.body.style.color = "white";
            // btn.style.color = "#f4f4f4";
            document.querySelectorAll('.button').forEach(el => {
                el.style.borderColor = '#f4f4f4';
            });
        } else {
            document.body.style.background = "#f4f4f4";
            document.body.style.color = "#333";
            // btn.style.color = "#333";
            document.querySelectorAll('.button').forEach(el => {
                el.style.borderColor = '#333';
            });
        }

        // btn.textContent = on ? 'Light Mode' : 'Dark Mode';
        setLabel();
    });

    // Update text when viewport crosses the breakpoint
    const mqHandler = () => setLabel();
    if (mql.addEventListener) mql.addEventListener('change', mqHandler);
    else mql.addListener(mqHandler); // older Safari fallbac
}


function initFormGuards() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  // avoid double-binding if you re-run after dynamic loads
  if (form.dataset.bound === '1') return;
  form.dataset.bound = '1';

  const loadTs = Date.now();
  const loadField = document.getElementById('form_load_ts');
  const delayField = document.getElementById('submit_delay_ms');
  if (loadField) loadField.value = loadTs;

  form.addEventListener('submit', (e) => {
    if (delayField) delayField.value = Date.now() - loadTs;

    // Guard: if submitted too fast, likely a bot
    const ms = Number(delayField?.value || 0);
    if (ms && ms < 1200) {
      // You can show a friendly message instead of silently blocking
      // alert('Please take a second to complete the form.');
      e.preventDefault();
    }
  });
}