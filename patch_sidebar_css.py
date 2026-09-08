import re

with open('src/css/style.css', 'r') as f:
    css = f.read()

# Add list-unstyled if not exists
if '.list-unstyled' not in css:
    css = css.replace('.item-sidebar__heading', '.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n\n.item-sidebar__heading')

# Replace the link styles
new_link_css = """
.item-sidebar__nav ul {
  display: flex;
  flex-direction: column;
  gap: 0.35rem; /* slight gap for pills */
}

.item-sidebar__link {
  color: var(--text-secondary);
  font-size: 0.875rem;
  font-weight: 500;
  padding: 0.5rem 0.875rem;
  border-radius: var(--border-radius-lg);
  display: block;
  transition: all 0.2s ease;
  line-height: 1.35;
}

.item-sidebar__link:hover {
  color: var(--text-primary);
  background: var(--zen-cream-darker);
}

.item-sidebar__link.active {
  color: var(--zen-cream);
  background: var(--zen-charcoal);
  font-weight: 600;
}
"""

css = re.sub(r'\.item-sidebar__link\s*\{[^\}]*\}[ \t\n]*\.item-sidebar__link:hover\s*\{[^\}]*\}[ \t\n]*\.item-sidebar__link\.active\s*\{[^\}]*\}', new_link_css.strip(), css)

with open('src/css/style.css', 'w') as f:
    f.write(css)
