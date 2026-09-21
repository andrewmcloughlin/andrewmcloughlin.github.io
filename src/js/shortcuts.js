document.addEventListener('DOMContentLoaded', () => {
    const hintTriggerKey = '\\';
    let shortcutsActive = false;

    // Create live region for accessibility
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.className = 'visually-hidden';
    document.body.appendChild(announcer);

    // Initialise badges on links
    const shortcutLinks = document.querySelectorAll('[data-shortcut]');
    const shortcuts = new Map();

    shortcutLinks.forEach(link => {
        const key = link.getAttribute('data-shortcut').toLowerCase();
        shortcuts.set(key, link);

        const badge = document.createElement('kbd');
        badge.className = 'shortcut-badge';
        badge.setAttribute('aria-hidden', 'true');
        badge.textContent = key;

        // Ensure link is relative for absolute positioning of badge
        if (getComputedStyle(link).position === 'static') {
            link.style.position = 'relative';
        }

        link.appendChild(badge);
    });

    const toggleHints = (active) => {
        shortcutsActive = active;
        document.body.classList.toggle('shortcuts-active', active);
        announcer.textContent = active ? 'Keyboard navigation hints active' : 'Keyboard navigation hints dismissed';
    };

    document.addEventListener('keydown', (e) => {
        // Don't trigger if user is typing in an input
        if (e.target.tagName === 'INPUT' ||
            e.target.tagName === 'TEXTAREA' ||
            e.target.isContentEditable) {
            return;
        }

        if (e.key === hintTriggerKey) {
            e.preventDefault();
            toggleHints(!shortcutsActive);
            return;
        }

        if (shortcutsActive) {
            if (e.key === 'Escape') {
                toggleHints(false);
                return;
            }

            const key = e.key.toLowerCase();
            if (shortcuts.has(key)) {
                e.preventDefault();
                const link = shortcuts.get(key);
                toggleHints(false);
                window.location.href = link.href;
            }
        }
    });

    // Dismiss on click outside
    document.addEventListener('mousedown', () => {
        if (shortcutsActive) {
            toggleHints(false);
        }
    });
});
