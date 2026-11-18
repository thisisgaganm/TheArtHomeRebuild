/* =====================================================
   PART 02 — REVEAL ANIMATION CONTROLLER
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".reveal");
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
        elements.forEach(element => {
            element.classList.add("is-visible");
        });

        return;
    }

    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    elements.forEach(element => {
        observer.observe(element);
    });
});