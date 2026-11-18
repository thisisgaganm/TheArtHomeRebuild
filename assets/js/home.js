
/* =========================================
   THE ART HOME INTERIORS
   PART 03 — HOMEPAGE INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // Hero image subtle parallax
    const heroImage = document.querySelector(".hero-image");

    if (
        heroImage &&
        !reduceMotion &&
        window.matchMedia("(min-width: 769px)").matches
    ) {

        let ticking = false;

        window.addEventListener("scroll", () => {

            if (!ticking) {
                window.requestAnimationFrame(() => {

                    const scrollPosition = window.scrollY;

                    if (scrollPosition < 700) {
                        heroImage.style.transform =
                            `translateY(${scrollPosition * 0.045}px)`;
                    }

                    ticking = false;
                });

                ticking = true;
            }

        }, { passive: true });

    }


    // Project image hover accessibility
    document.querySelectorAll(".home-project").forEach(project => {

        project.addEventListener("focusin", () => {
            project.classList.add("project-focused");
        });

        project.addEventListener("focusout", () => {
            project.classList.remove("project-focused");
        });

    });


    // Hero image fallback if image is unavailable
    document.querySelectorAll("img").forEach(img => {

        img.addEventListener("error", () => {
            img.classList.add("image-missing");
        });

    });

});
