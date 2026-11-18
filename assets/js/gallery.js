
/* =========================================
   THE ART HOME INTERIORS
   PART 6 — GALLERY INTERACTIONS
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const filterButtons = document.querySelectorAll(".gallery-filter");
    const galleryItems = document.querySelectorAll(".gallery-item");

    // GALLERY FILTERING
    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const selectedFilter = button.dataset.filter;

            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            // Filter gallery items
            galleryItems.forEach(item => {

                const itemCategory = item.dataset.category;

                if (
                    selectedFilter === "all" ||
                    selectedFilter === itemCategory
                ) {
                    item.classList.remove("is-hidden");
                } else {
                    item.classList.add("is-hidden");
                }

            });

        });

    });

});
