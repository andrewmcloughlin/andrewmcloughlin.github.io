document.addEventListener('DOMContentLoaded', () => {
    const hintTriggerKey = '\\';
    let charShortcutsEnabled = localStorage.getItem('charShortcutsEnabled') !== 'false';

    const dialog = document.getElementById('shortcuts-dialog');
    const triggerBtn = document.getElementById('shortcuts-trigger');
    const closeBtn = document.getElementById('close-shortcuts-dialog');
    const checkbox = document.getElementById('enable-char-shortcuts');

    checkbox.checked = charShortcutsEnabled;
    checkbox.addEventListener('change', (e) => {
        charShortcutsEnabled = e.target.checked;
        localStorage.setItem('charShortcutsEnabled', charShortcutsEnabled);
    });

    triggerBtn.addEventListener('click', () => {
        dialog.showModal();
    });

    closeBtn.addEventListener('click', () => {
        dialog.close();
    });

    // Mapping generated from Eleventy
    const shortcutsMap = new Map();
    if (window.__shortcuts) {
        window.__shortcuts.forEach(shortcut => {
            shortcutsMap.set(shortcut.code, shortcut.url);
        });
    }

    document.addEventListener('keydown', (e) => {
        // Don't trigger if user is typing in a text field!
        const isTextInput = (e.target.tagName === 'INPUT' && !['checkbox', 'radio', 'button', 'submit', 'reset'].includes(e.target.type)) ||
            e.target.tagName === 'TEXTAREA' ||
            e.target.isContentEditable;

        if (isTextInput) {
            return;
        }

        // Also, ignore when modifier is pressed
        if (e.ctrlKey || e.altKey || e.metaKey || e.shiftKey) {
            return;
        }

        if (e.key === hintTriggerKey) {
            if (charShortcutsEnabled && !dialog.open) {
                e.preventDefault();
                dialog.showModal();
            }
            return;
        }

        if (charShortcutsEnabled || dialog.open) {
            const key = e.key.toLowerCase();
            if (shortcutsMap.has(key)) {
                e.preventDefault();
                const targetPath = shortcutsMap.get(key);

                if (dialog.open) {
                    dialog.close();
                }

                if (targetPath === '#email') {
                    const emailLink = document.querySelector('.email-link');
                    if (emailLink) {
                        emailLink.click();
                    }
                } else {
                    window.location.href = targetPath;
                }
            }
        }
    });
});
