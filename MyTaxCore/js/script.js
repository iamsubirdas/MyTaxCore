/* =========================================================
   MYTAXCORE
   Main Website JavaScript
   File: js/script.js
========================================================= */

"use strict";


/* =========================================================
   1. DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    initializeMobileMenu();

    initializeServicesDropdown();

    initializeSmoothScrolling();

    initializeHeaderScroll();

    initializeActiveNavigation();

    initializeServiceLinks();

    initializeCurrentYear();

    initializeContactLinks();

    initializeScrollReveal();

});


/* =========================================================
   2. MOBILE MENU
========================================================= */

function initializeMobileMenu() {

    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (!menuToggle || !navbar) {
        return;
    }


    menuToggle.addEventListener("click", function () {

        const isOpen =
            menuToggle.classList.toggle("active");

        navbar.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    /* Close menu when normal navigation link is clicked */

    const navLinks =
        navbar.querySelectorAll(
            "a.nav-link"
        );


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            closeMobileMenu(
                menuToggle,
                navbar
            );

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener(
        "click",
        function (event) {

            const clickedInsideNavbar =
                navbar.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);


            if (
                !clickedInsideNavbar &&
                !clickedMenuButton &&
                navbar.classList.contains("active")
            ) {

                closeMobileMenu(
                    menuToggle,
                    navbar
                );

            }

        }
    );


    /* Close menu with Escape */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                navbar.classList.contains("active")
            ) {

                closeMobileMenu(
                    menuToggle,
                    navbar
                );

            }

        }
    );


    /* Close mobile menu after resizing to desktop */

    window.addEventListener(
        "resize",
        function () {

            if (window.innerWidth > 850) {

                closeMobileMenu(
                    menuToggle,
                    navbar
                );

            }

        }
    );

}


/* =========================================================
   3. CLOSE MOBILE MENU
========================================================= */

function closeMobileMenu(
    menuToggle,
    navbar
) {

    menuToggle.classList.remove("active");

    navbar.classList.remove("active");

    menuToggle.setAttribute(
        "aria-expanded",
        "false"
    );

    document.body.classList.remove(
        "menu-open"
    );

}


/* =========================================================
   4. SERVICES DROPDOWN
========================================================= */

function initializeServicesDropdown() {

    const dropdown =
        document.querySelector(".nav-dropdown");

    const dropdownButton =
        document.querySelector(".dropdown-btn");


    if (!dropdown || !dropdownButton) {
        return;
    }


    dropdownButton.addEventListener(
        "click",
        function (event) {

            /*
             * On mobile the dropdown is controlled
             * by JavaScript.
             */

            if (window.innerWidth <= 850) {

                event.preventDefault();

                dropdown.classList.toggle(
                    "open"
                );

            }

        }
    );


    /* Close dropdown on desktop when mouse leaves */

    dropdown.addEventListener(
        "mouseleave",
        function () {

            if (window.innerWidth > 850) {

                dropdown.classList.remove(
                    "open"
                );

            }

        }
    );

}


/* =========================================================
   5. SMOOTH SCROLLING
========================================================= */

function initializeSmoothScrolling() {

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top:
                        Math.max(
                            targetPosition,
                            0
                        ),

                    behavior: "smooth"

                });

            }
        );

    });

}


/* =========================================================
   6. HEADER SCROLL EFFECT
========================================================= */

function initializeHeaderScroll() {

    const header =
        document.querySelector(".header");


    if (!header) {
        return;
    }


    function updateHeader() {

        if (window.scrollY > 25) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


/* =========================================================
   7. ACTIVE NAVIGATION
========================================================= */

function initializeActiveNavigation() {

    const currentPage =
        getCurrentPageName();


    const navLinks =
        document.querySelectorAll(
            ".navbar a[href]"
        );


    navLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");


        if (!href) {
            return;
        }


        /*
         * Ignore anchor links such as #about
         */

        if (href.startsWith("#")) {
            return;
        }


        const linkPage =
            href
                .split("/")
                .pop()
                .split("?")[0]
                .split("#")[0];


        if (
            linkPage &&
            linkPage.toLowerCase() ===
            currentPage.toLowerCase()
        ) {

            link.classList.add(
                "active"
            );

        }

    });

}


/* =========================================================
   8. GET CURRENT PAGE
========================================================= */

function getCurrentPageName() {

    const path =
        window.location.pathname;


    let page =
        path
            .split("/")
            .pop();


    /*
     * If the browser is currently at
     * / or no filename exists,
     * treat it as index.html.
     */

    if (!page) {

        page = "index.html";

    }


    return page;

}


/* =========================================================
   9. SERVICE PAGE LINKS
========================================================= */

function initializeServiceLinks() {

    const serviceCards =
        document.querySelectorAll(
            "[data-service-link]"
        );


    serviceCards.forEach(function (card) {

        const destination =
            card.getAttribute(
                "data-service-link"
            );


        if (!destination) {
            return;
        }


        card.addEventListener(
            "click",
            function () {

                window.location.href =
                    destination;

            }
        );


        card.setAttribute(
            "role",
            "link"
        );


        card.setAttribute(
            "tabindex",
            "0"
        );


        card.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    window.location.href =
                        destination;

                }

            }
        );

    });

}


/* =========================================================
   10. CONTACT LINKS
========================================================= */

function initializeContactLinks() {

    /*
     * Phone
     */

    const phoneLinks =
        document.querySelectorAll(
            'a[data-phone]'
        );


    phoneLinks.forEach(function (link) {

        const number =
            link.getAttribute(
                "data-phone"
            );


        if (!number) {
            return;
        }


        link.href =
            "tel:" + number;

    });


    /*
     * WhatsApp
     */

    const whatsappLinks =
        document.querySelectorAll(
            'a[data-whatsapp]'
        );


    whatsappLinks.forEach(function (link) {

        const number =
            link.getAttribute(
                "data-whatsapp"
            );


        if (!number) {
            return;
        }


        const cleanNumber =
            number.replace(
                /[^0-9]/g,
                ""
            );


        link.href =
            "https://wa.me/" +
            cleanNumber;

        link.target =
            "_blank";

        link.rel =
            "noopener noreferrer";

    });


    /*
     * Email
     */

    const emailLinks =
        document.querySelectorAll(
            'a[data-email]'
        );


    emailLinks.forEach(function (link) {

        const email =
            link.getAttribute(
                "data-email"
            );


        if (!email) {
            return;
        }


        link.href =
            "mailto:" + email;

    });

}


/* =========================================================
   11. CURRENT YEAR
========================================================= */

function initializeCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    if (!yearElements.length) {
        return;
    }


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach(
        function (element) {

            element.textContent =
                currentYear;

        }
    );

}


/* =========================================================
   12. SCROLL REVEAL
========================================================= */

function initializeScrollReveal() {

    const revealElements =
        document.querySelectorAll(
            ".service-card, " +
            ".about-card, " +
            ".why-item, " +
            ".contact-card, " +
            ".location-box"
        );


    if (!revealElements.length) {
        return;
    }


    /*
     * Respect users who prefer reduced motion.
     */

    if (
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        return;

    }


    /*
     * Create the required styles dynamically.
     * This avoids requiring another CSS file.
     */

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "js-reveal"
            );

        }
    );


    const observer =
        new IntersectionObserver(
            function (entries, observerInstance) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "js-visible"
                            );


                            observerInstance.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(
        function (element) {

            observer.observe(element);

        }
    );

}


/* =========================================================
   13. DYNAMIC REVEAL STYLES
========================================================= */

(function addRevealStyles() {

    const style =
        document.createElement("style");


    style.textContent = `

        .js-reveal {
            opacity: 0;
            transform: translateY(25px);
            transition:
                opacity 0.65s ease,
                transform 0.65s ease;
        }

        .js-reveal.js-visible {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {

            .js-reveal {
                opacity: 1;
                transform: none;
                transition: none;
            }

        }

    `;


    document.head.appendChild(style);

})();


/* =========================================================
   14. SERVICE CARD KEYBOARD SUPPORT
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        const activeElement =
            document.activeElement;


        if (
            !activeElement ||
            !activeElement.matches(
                "[data-service-link]"
            )
        ) {

            return;

        }


        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            activeElement.click();

        }

    }
);


/* =========================================================
   15. WHATSAPP FALLBACK
========================================================= */

window.openWhatsApp =
    function (phoneNumber, message = "") {

        const cleanNumber =
            String(phoneNumber)
                .replace(
                    /[^0-9]/g,
                    ""
                );


        if (!cleanNumber) {
            return;
        }


        const encodedMessage =
            encodeURIComponent(
                message
            );


        const url =
            "https://wa.me/" +
            cleanNumber +
            (
                encodedMessage
                    ? "?text=" + encodedMessage
                    : ""
            );


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    };


/* =========================================================
   16. PHONE FALLBACK
========================================================= */

window.callBusiness =
    function (phoneNumber) {

        const cleanNumber =
            String(phoneNumber)
                .replace(
                    /[^0-9+]/g,
                    ""
                );


        if (!cleanNumber) {
            return;
        }


        window.location.href =
            "tel:" + cleanNumber;

    };


/* =========================================================
   17. EMAIL FALLBACK
========================================================= */

window.emailBusiness =
    function (emailAddress) {

        const email =
            String(emailAddress)
                .trim();


        if (!email) {
            return;
        }


        window.location.href =
            "mailto:" + email;

    };


/* =========================================================
   18. CONSOLE MESSAGE
========================================================= */

console.log(
    "%cMyTaxCore Website",
    "color:#0756c9;font-size:20px;font-weight:800;"
);


console.log(
    "%cTax & Compliance Solutions",
    "color:#54b948;font-size:14px;font-weight:700;"
);