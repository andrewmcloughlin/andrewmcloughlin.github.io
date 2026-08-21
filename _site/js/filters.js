document.addEventListener("DOMContentLoaded", () => {
    const filterBtns = document.querySelectorAll("button[data-filter]");
    const portfolioItems = document.querySelectorAll(".portfolio-item");

    if (filterBtns.length === 0) return;

    filterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove("active"));
            // Add active class to clicked
            btn.classList.add("active");

            const filterValue = btn.getAttribute("data-filter");

            portfolioItems.forEach(item => {
                if (filterValue === "all") {
                    item.classList.remove("d-none");
                    // trigger layout reflow for animation
                    setTimeout(() => item.style.opacity = 1, 10);
                } else {
                    const tags = item.getAttribute("data-tags") || "";
                    if (tags.includes(filterValue)) {
                        item.classList.remove("d-none");
                        setTimeout(() => item.style.opacity = 1, 10);
                    } else {
                        item.style.opacity = 0;
                        setTimeout(() => item.classList.add("d-none"), 400); // Wait for transition
                    }
                }
            });
        });
    });
});
