(() => {
    const prefix = (window.__pathPrefix || '/').replace(/\/$/, '');
    const PAGES = ['/', '/cv/', '/portfolio/work/'].map(p => prefix + p);
    const MIN_SWIPE_X = 60;
    const MAX_SWIPE_Y = 80;

    function normPath(p) {
        return p.replace(/\/+/g, '/').replace(/\/?$/, '/');
    }

    function currentIndex() {
        const path = normPath(window.location.pathname);
        const idx = PAGES.findIndex(p => normPath(p) === path);
        return idx === -1 ? 0 : idx;
    }

    function isMobile() {
        return window.innerWidth <= 991;
    }

    function navigate(direction) {
        const idx = currentIndex();
        const next = idx + direction;
        if (next < 0 || next >= PAGES.length) return;

        const main = document.querySelector('main');
        if (!main) return;

        const outClass = direction > 0 ? 'slide-out-left' : 'slide-out-right';
        main.classList.add(outClass);

        main.addEventListener('animationend', () => {
            window.location.href = PAGES[next];
        }, { once: true });
    }

    let startX = 0;
    let startY = 0;

    document.addEventListener('touchstart', (e) => {
        if (!isMobile()) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        if (!isMobile()) return;
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;

        if (Math.abs(dx) < MIN_SWIPE_X || Math.abs(dy) > MAX_SWIPE_Y) return;

        navigate(dx < 0 ? 1 : -1);
    }, { passive: true });

    document.addEventListener('DOMContentLoaded', () => {
        if (!isMobile()) return;
        const main = document.querySelector('main');
        if (!main) return;
        main.classList.add('slide-in-left');
        main.addEventListener('animationend', () => {
            main.classList.remove('slide-in-left');
        }, { once: true });
    });
})();
