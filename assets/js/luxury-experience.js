
/* =========================================
   THE ART HOME — PART 11
   LUXURY INTERACTIVE EXPERIENCE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    // -------------------------------------
    // 1. SCROLL REVEAL ANIMATIONS
    // -------------------------------------

    const revealElements = document.querySelectorAll(
        ".reveal-left, .reveal-right, .luxury-divider"
    );

    if ("IntersectionObserver" in window && !reduceMotion) {
        document.documentElement.classList.add("luxury-animations-ready");

        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("is-visible");
        });
    }

    // -------------------------------------
    // 2. CINEMATIC PAGE TRANSITIONS
    // -------------------------------------

    if (!reduceMotion) {
        document.body.classList.add("page-entering");
        window.setTimeout(() => {
            document.body.classList.remove("page-entering");
        }, 600);

        const internalLinks = document.querySelectorAll("a[href]");

        internalLinks.forEach(link => {
            link.addEventListener("click", event => {
                const href = link.getAttribute("href");
                const target = link.getAttribute("target");

                if (
                    event.defaultPrevented ||
                    event.button !== 0 ||
                    !href ||
                    href.startsWith("#") ||
                    href.startsWith("mailto:") ||
                    href.startsWith("tel:") ||
                    href.startsWith("javascript:") ||
                    (target && target !== "_self") ||
                    link.hasAttribute("download") ||
                    event.ctrlKey ||
                    event.metaKey ||
                    event.shiftKey ||
                    event.altKey
                ) {
                    return;
                }

                const destination = new URL(href, window.location.href);

                if (
                    destination.origin !== window.location.origin ||
                    destination.pathname === window.location.pathname &&
                    destination.search === window.location.search
                ) {
                    return;
                }

                if (
                    destination.protocol !== "http:" &&
                    destination.protocol !== "https:" &&
                    destination.protocol !== "file:"
                ) {
                    return;
                }

                event.preventDefault();
                document.body.classList.add("page-leaving");

                window.setTimeout(() => {
                    window.location.href = destination.href;
                }, 220);
            });
        });
    }

    // -------------------------------------
    // 3. OPTIONAL PREMIUM ELEMENT CLASSES
    // -------------------------------------

    document.querySelectorAll(".image-wrap").forEach(element => {
        element.classList.add("luxury-image");
    });

    document.querySelectorAll(".text-link").forEach(element => {
        element.classList.add("luxury-link");
    });

    document.querySelectorAll(".btn").forEach(element => {
        element.classList.add("luxury-button");
    });
});
