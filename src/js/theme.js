const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const setThemeIcon = (theme) => {
    const icon = theme === 'light' ? 'fa-moon' : 'fa-sun';
    document.querySelectorAll('.theme-icon').forEach(el => {
        el.className = `fa-solid ${icon} theme-icon`;
    });
};

const syncGlow = (theme) => {
    const glow = document.querySelector('.lamp-glow');
    if (!glow) return;
    glow.classList.toggle('lamp-glow--on', theme === 'dark');
    new Audio('/_includes/sounds/lightswitch.wav').play();
};

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    setThemeIcon(theme);
};

setTheme(getPreferredTheme());
syncGlow(getPreferredTheme());

document.addEventListener('DOMContentLoaded', () => {
    setThemeIcon(getPreferredTheme());

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            const theme = e.matches ? 'dark' : 'light';
            setTheme(theme);
            syncGlow(theme);
        }
    });

    document.querySelectorAll('#theme-toggle, #theme-toggle-mobile').forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-bs-theme');
            const next = current === 'light' ? 'dark' : 'light';
            setTheme(next);
            const flickDelay = 300;
            setTimeout(() => {
                const flick = document.getElementById('forearm-flick');
                if (flick) flick.beginElement();
            }, flickDelay);
            setTimeout(() => syncGlow(next), flickDelay + 240);
        });
    });
});
