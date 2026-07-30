// ===============================
// Mobile Menu
// ===============================

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });

}

// ===============================
// Active Navigation Link
// ===============================

const currentPage = window.location.pathname.split("/").pop() || "index.html";

const links = document.querySelectorAll(".nav-links a");

links.forEach(link => {

    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage) {

        link.classList.add("active");

    }

});