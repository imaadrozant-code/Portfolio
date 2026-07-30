// ======================================
// MOBILE MENU
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const hamburger =
        document.getElementById(
            "hamburger"
        );

    const navLinks =
        document.getElementById(
            "navLinks"
        );


    if (!hamburger || !navLinks) return;


    // ==================================
    // TOGGLE MENU
    // ==================================

    hamburger.addEventListener(
        "click",
        () => {

            const isOpen =
                navLinks.classList.toggle(
                    "active"
                );


            hamburger.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    // ==================================
    // CLOSE AFTER CLICKING LINK
    // ==================================

    const links =
        navLinks.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                navLinks.classList.remove(
                    "active"
                );


                hamburger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });


    // ==================================
    // ACTIVE PAGE
    // ==================================

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() ||
        "index.html";


    links.forEach(link => {

        const linkPage =
            link
                .getAttribute("href")
                .split("/")
                .pop();


        if (
            linkPage === currentPage
        ) {

            link.classList.add(
                "active"
            );

        }

    });

});