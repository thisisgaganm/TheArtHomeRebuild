
document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector(".main-nav");
    const navLinks = document.querySelectorAll(".main-nav a");
    const loader = document.querySelector(".page-loader");
    const yearElements = document.querySelectorAll("[data-year], #currentYear");

    // Current year
    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });

    // Page loader
    window.addEventListener("load", () => {
        if (loader) {
            loader.classList.add("is-hidden");

            setTimeout(() => {
                loader.style.display = "none";
            }, 600);
        }
    });

    // Header scroll effect
    const updateHeader = () => {
        if (!header) return;

        header.classList.toggle("is-scrolled", window.scrollY > 30);
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    // Mobile navigation
    const closeMenu = () => {
        if (!menuToggle || !navigation) return;

        menuToggle.classList.remove("active");
        navigation.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
    };

    if (menuToggle && navigation) {
        menuToggle.setAttribute("aria-expanded", "false");

        menuToggle.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("is-open");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
            document.body.classList.toggle("menu-open", isOpen);
        });

        navLinks.forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("click", event => {
            if (
                navigation.classList.contains("is-open") &&
                !navigation.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                closeMenu();
            }
        });

        document.addEventListener("keydown", event => {
            if (event.key === "Escape") closeMenu();
        });
    }

    // Mark current navigation page
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    navLinks.forEach(link => {
        link.classList.remove("active");
        link.removeAttribute("aria-current");
    });

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href")?.split("/").pop();
        const isCurrentPage = linkPage === currentPage;
        const isGalleryPage =
            (currentPage === "design-gallery.html" ||
                currentPage === "execution-gallery.html") &&
            linkPage === "gallery.html";

        if (isCurrentPage || isGalleryPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    // Smooth anchor scrolling
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia(
                        "(prefers-reduced-motion: reduce)"
                    ).matches ? "auto" : "smooth",
                    block: "start"
                });
            }
        });
    });

    // Back to top
    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {
        const updateBackToTop = () => {
            backToTop.classList.toggle("visible", window.scrollY > 500);
        };

        updateBackToTop();
        window.addEventListener("scroll", updateBackToTop, { passive: true });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "auto" : "smooth"
            });
        });
    }

    // Image loading improvements
    document.querySelectorAll("img").forEach((image, index) => {
        if (index > 2 && !image.hasAttribute("loading")) {
            image.loading = "lazy";
        }

        image.decoding = "async";
    });

    // Close mobile menu if screen becomes desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 991) {
            closeMenu();
        }
    });
});
