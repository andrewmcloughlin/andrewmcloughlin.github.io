const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const setThemeIcon = (theme) => {
    const icon = theme === 'light' ? 'fa-sun' : 'fa-moon';
    document.querySelectorAll('.theme-icon').forEach(el => {
        el.className = `fa-solid ${icon}`;
    });
};

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
    setThemeIcon(theme);
};

setTheme(getPreferredTheme());

document.addEventListener('DOMContentLoaded', () => {
    setThemeIcon(getPreferredTheme());

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    document.querySelectorAll('#theme-toggle, #theme-toggle-mobile').forEach(btn => {
        btn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-bs-theme');
            setTheme(current === 'light' ? 'dark' : 'light');
        });
    });
});
