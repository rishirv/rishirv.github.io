document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav a");
    let ticking = false;
    let scrollingManually = true; // Flag to prevent updates during smooth scrolling

    function highlightNav() {
        if (!scrollingManually) return; // Don't update if smooth scrolling is active

        if (!ticking) {
            requestAnimationFrame(() => {
                let scrollPosition = window.scrollY + 100; // Adjust based on navbar height
                let closestSection = null;
                let minDistance = Number.MAX_VALUE;

                sections.forEach((section) => {
                    let sectionTop = section.offsetTop;
                    let distance = Math.abs(scrollPosition - sectionTop);

                    if (distance < minDistance) {
                        minDistance = distance;
                        closestSection = section;
                    }
                });

                if (closestSection) {
                    let activeId = closestSection.getAttribute("id");
                    navLinks.forEach((link) => {
                        link.classList.remove("is_active");
                        if (link.hash === `#${activeId}`) {
                            link.classList.add("is_active");
                        }
                    });
                }

                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener("scroll", highlightNav);
    highlightNav(); // Run once on load

    // Smooth scrolling for navbar clicks
    document.querySelectorAll('.nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.hash;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                scrollingManually = false; // Disable scroll-based updates

                // Immediately highlight the clicked section
                navLinks.forEach((link) => {
                    link.classList.remove("is_active");
                });
                this.classList.add("is_active");

                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Adjusted for navbar height
                    behavior: "smooth"
                });

                // Re-enable scroll detection after smooth scrolling completes
                setTimeout(() => {
                    scrollingManually = true;
                }, 600); // Adjust based on scroll duration
            }
        });
    });
});