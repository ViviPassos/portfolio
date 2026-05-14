
// PRELOADER
window.addEventListener('load', () => {
    setTimeout(() => document.getElementById('preloader').classList.add('hidden'), 2300);
});

// HAMBURGER
const ham = document.getElementById('hamburger');
const navEl = document.getElementById('navLinks');
ham.addEventListener('click', () => navEl.classList.toggle('open'));
navEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navEl.classList.remove('open')));

// REVEAL
const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: .1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// ACTIVE NAV
const secs = document.querySelectorAll('section[id]');
const nas = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
    nas.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + cur));
});

// EDUCATION TABS
document.querySelectorAll('.edu-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.edu-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.edu-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    });
});

// PROJ SCROLL — floating arrows like Nicolas
const track = document.getElementById('projTrack');
const projWrap = document.getElementById('projWrap');
const arrowRight = document.getElementById('projArrow');
const arrowLeft = document.getElementById('projArrowLeft');
const projOuter = document.querySelector('.proj-outer');

function updateArrows() {
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 8;
    const atStart = track.scrollLeft <= 8;
    arrowRight.classList.toggle('hidden', atEnd);
    projOuter.classList.toggle('can-left', !atStart);
}

const cardWidth = () => (track.children[0]?.offsetWidth || 380) + 24;

arrowRight.addEventListener('click', () => {
    track.scrollBy({ left: cardWidth(), behavior: 'smooth' });
});

arrowLeft.addEventListener('click', () => {
    track.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
});

track.addEventListener('scroll', updateArrows);
window.addEventListener('resize', updateArrows);
updateArrows();

// ── LANGUAGE SWITCHER ──
const langBtn = document.getElementById('langBtn');
const langDropdown = document.getElementById('langDropdown');
const langOptions = document.querySelectorAll('.lang-option');
let currentLang = 'pt';

langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle('open');
});
document.addEventListener('click', () => langDropdown.classList.remove('open'));

langOptions.forEach(opt => {
    opt.addEventListener('click', () => {
        const lang = opt.dataset.lang;
        if (lang === currentLang) { langDropdown.classList.remove('open'); return; }
        currentLang = lang;
        langBtn.textContent = lang.toUpperCase();
        langOptions.forEach(o => o.classList.toggle('active', o.dataset.lang === lang));
        langDropdown.classList.remove('open');
        applyLang(lang);
        document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    });
});

function applyLang(lang) {
    // translate all elements with data-pt / data-en
    document.querySelectorAll('[data-pt],[data-en]').forEach(el => {
        const val = el.getAttribute('data-' + lang);
        if (val !== null) el.innerHTML = val;
    });
    // translate elements whose text content is the attribute value (inputs, buttons, etc)
    document.querySelectorAll('[data-pt]').forEach(el => {
        const val = el.getAttribute('data-' + lang);
        if (val !== null && el.children.length === 0) el.textContent = val;
    });
    // update page title
    document.title = lang === 'pt'
        ? 'Vitoria Maria — Desenvolvedora Fullstack'
        : 'Vitoria Maria — Fullstack Developer';
    // update edu tabs content
    document.querySelectorAll('.edu-tab').forEach(tab => {
        const val = tab.getAttribute('data-' + lang);
        if (val) tab.textContent = val;
    });
    // Ver projeto links
    document.querySelectorAll('.proj-link').forEach(a => {
        const textNode = [...a.childNodes].find(n => n.nodeType === 3);
        if (textNode) textNode.textContent = lang === 'pt' ? 'Ver projeto ' : 'View project ';
    });
}

