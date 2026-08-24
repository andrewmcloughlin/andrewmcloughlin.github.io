/* Highlight active nav link using IntersectionObserver */
(function () {
    const sections = document.querySelectorAll('.spa-section');
    const mobileLinks = document.querySelectorAll('#mobileScrollNav .nav-link');
    const sideLinks = document.querySelectorAll('#sideScrollNav .nav-link');

    function setActive(id) {
        [...mobileLinks, ...sideLinks].forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === '#' + id);
        });
    }

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActive(entry.target.id);
                }
            });
        },
        { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    sections.forEach(section => observer.observe(section));

    /* Smooth scroll for anchor links */
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    /* Scroll-to-top FAB */
    const fab = document.getElementById('scroll-top-fab');
    if (fab) {
        window.addEventListener('scroll', () => {
            fab.classList.toggle('visible', window.scrollY > 300);
        }, { passive: true });

        fab.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
})();
