const toggle = document.getElementById('theme-toggle');
const text = document.getElementById('theme-text');
const iconDark = document.getElementById('theme-icon-dark');
const iconLight = document.getElementById('theme-icon-light');
const html = document.documentElement;

function updateTheme(isLight) {
    if (isLight) {
        html.setAttribute('data-theme', 'light');
        iconDark.style.display = 'none';
        iconLight.style.display = 'inline';
        text.textContent = 'Dark mode on';
    } else {
        html.removeAttribute('data-theme');
        iconDark.style.display = 'inline';
        iconLight.style.display = 'none';
        text.textContent = 'Make me blind';
    }
}

const saved = localStorage.getItem('theme');
if (saved === 'light') {
    updateTheme(true);
}

if (toggle) {
    toggle.addEventListener('click', () => {
        const isLight = html.getAttribute('data-theme') === 'light';
        updateTheme(!isLight);
        localStorage.setItem('theme', isLight ? 'dark' : 'light');
    });
}