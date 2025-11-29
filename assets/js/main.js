// Welcome typing effect
document.addEventListener("DOMContentLoaded", () => {
    const intro = document.getElementById("intro");
    if (!intro) return;   // <-- prevent crash

    const text = "Hey, I'm Nahuel 👋";
    let i = 0;

    function type() {
        if (i < text.length) {
            intro.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 100);
        }
    }

    type();
});

// Welcome fading effect
const enterBtn = document.getElementById("enter-btn");
if (enterBtn) {
    enterBtn.addEventListener("click", function() {
        const welcome = document.getElementById("welcome-screen");
        if (welcome) welcome.classList.add("fade-out");
    });
}

// Loading all events
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

        // -------------------------
        // 🔥 Now attach event listeners
        // -------------------------

        
        // Desktop toggle
        const toggleBtn = document.getElementById("toggle-sidebar");
        const sidebar = document.getElementById("sidebar");
        const main = document.getElementById("main");

        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => {
                sidebar.classList.toggle("hidden");
                main.classList.toggle("expanded");
            });
        }

        // Mobile hamburger toggle
        const mobileHamb = document.getElementById("mobile-hamburger");
        if (mobileHamb) {
            mobileHamb.addEventListener("click", () => {
                sidebar.classList.toggle("open");
            });
        }

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
    const icon = document.getElementById("toggle-sidebar-icon");

    if (!sidebar || !toggle || !main || !icon) return;

    // avoid double-binding
    if (toggle.dataset.bound === '1') return;
    toggle.dataset.bound = '1';

    // Sidebar toggle
    toggle.addEventListener("click", () => {
        const isHidden = sidebar.classList.toggle("hidden");
        main.classList.toggle("expanded", isHidden);
        document.body.classList.toggle("sidebar-closed", isHidden);
        icon.className = isHidden ? "fas fa-arrow-right" : "fas fa-arrow-left";
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
    const toggle = document.getElementById("dark-mode-switch");
    const icon = document.getElementById("darkmode-icon");

    if (!toggle || !icon) return;

    // Restore saved state
    const saved = localStorage.getItem("darkMode") === "on";
    document.body.classList.toggle("dark-mode", saved);
    toggle.checked = saved;
    icon.textContent = saved ? "dark_mode" : "light_mode";

    toggle.addEventListener("change", () => {
        const on = toggle.checked;
        document.body.classList.toggle("dark-mode", on);
        localStorage.setItem("darkMode", on ? "on" : "off");
        icon.textContent = on ? "dark_mode" : "light_mode";

        // Small animation
        // icon.style.transform = "scale(0.85)";
        // setTimeout(() => {
        //     icon.textContent = on ? "dark_mode" : "light_mode";
        //     icon.style.transform = "scale(1)";
        // }, 120);
    });
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