(() => {
    const animationIds = [
        'handle',
        'body',
        'steam-left',
        'steam-right',
        'right-forearm',
        'right-bicep',
    ];
    document.addEventListener('trigger-drink-animation', () => {
        animationIds.forEach(triggerAnim);
    });

    const averageInterval = 15_000;
    const intervalVariation = 5_000;

    const triggerAnim = (id) => {
        const el = document.getElementById(id);
        if (!el) return;

        el.classList.remove('flick');
        void el.getBoundingClientRect();
        el.classList.add('flick');
        el.addEventListener('animationend', () => el.classList.remove('flick'), { once: true });
    };

    document.getElementById('mug-with-steam')?.addEventListener('click', () => {
        animationIds.forEach(triggerAnim);
    });

    const scheduleNextAnimation = () => {
        const delay = averageInterval + (Math.random() * 2 - 1) * intervalVariation;
        window.setTimeout(() => {
            animationIds.forEach(triggerAnim);
            scheduleNextAnimation();
        }, delay);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', scheduleNextAnimation, { once: true });
    } else {
        scheduleNextAnimation();
    }
})();
