// ======================================
// GOOGLE SHEETS API
// ======================================

const TESTIMONIALS_API_URL =
    "https://script.google.com/macros/s/AKfycbwK5X7RDn4Z05lhpmd314vRNdLbo0a8nm-VuWQirk91UqtdzH_W05s0KE-RZemgLpzCPg/exec?sheet=Testimonials";


const TESTIMONIALS_POST_URL =
    "https://script.google.com/macros/s/AKfycbwK5X7RDn4Z05lhpmd314vRNdLbo0a8nm-VuWQirk91UqtdzH_W05s0KE-RZemgLpzCPg/exec";


// ======================================
// PAGE LOAD
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    loadTestimonials();

    setupTestimonialForm();

});


// ======================================
// LOAD TESTIMONIALS
// ======================================

async function loadTestimonials() {

    const container =
        document.getElementById(
            "testimonials-container"
        );

    if (!container) return;


    try {

        const response =
            await fetch(
                TESTIMONIALS_API_URL
            );


        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }


        const result =
            await response.json();


        console.log(
            "Testimonials API:",
            result
        );


        if (!result || !Array.isArray(result.data)) {

            throw new Error(
                "Invalid testimonials data."
            );

        }


        buildTestimonials(
            result.data
        );


    } catch (error) {

        console.error(
            "Error loading testimonials:",
            error
        );


        container.innerHTML = `

            <p class="error-message">

                Unable to load testimonials right now.

            </p>

        `;

    }

}


// ======================================
// BUILD TESTIMONIALS
// ======================================

function buildTestimonials(data) {

    const container =
        document.getElementById(
            "testimonials-container"
        );


    if (!container) return;


    container.innerHTML = "";


    if (!data || data.length === 0) {

        container.innerHTML = `

            <p class="empty-message">

                No testimonials available yet.

            </p>

        `;

        return;

    }


    data.forEach(item => {

        const card =
            document.createElement(
                "article"
            );


        card.className =
            "testimonial-card";


        const stars =
            document.createElement(
                "div"
            );

        stars.className =
            "stars";

        stars.textContent =
            generateStars(
                item.Rating
            );


        const review =
            document.createElement(
                "p"
            );

        review.className =
            "review";

        review.textContent =
            `"${item.Review || ""}"`;


        const client =
            document.createElement(
                "div"
            );

        client.className =
            "client";


        const avatar =
            document.createElement(
                "div"
            );

        avatar.className =
            "avatar-placeholder";

        avatar.textContent =
            getInitials(
                item.Name
            );


        const details =
            document.createElement(
                "div"
            );

        details.className =
            "client-details";


        const name =
            document.createElement(
                "h3"
            );

        name.textContent =
            item.Name ||
            "Client";


        const position =
            document.createElement(
                "p"
            );

        position.textContent =
            item.Position ||
            "";


        const company =
            document.createElement(
                "p"
            );

        company.textContent =
            item.Company ||
            "";


        details.appendChild(name);

        if (item.Position) {

            details.appendChild(position);

        }


        if (item.Company) {

            details.appendChild(company);

        }


        client.appendChild(avatar);

        client.appendChild(details);


        card.appendChild(stars);

        card.appendChild(review);

        card.appendChild(client);


        container.appendChild(card);

    });

}


// ======================================
// GENERATE STARS
// ======================================

function generateStars(rating) {

    let value =
        parseInt(rating, 10);


    if (
        Number.isNaN(value) ||
        value < 1 ||
        value > 5
    ) {

        value = 5;

    }


    return (
        "★".repeat(value) +
        "☆".repeat(5 - value)
    );

}


// ======================================
// GET INITIALS
// ======================================

function getInitials(name) {

    if (!name) return "?";


    return String(name)

        .trim()

        .split(/\s+/)

        .map(part =>
            part.charAt(0)
        )

        .join("")

        .substring(0, 2)

        .toUpperCase();

}


// ======================================
// TESTIMONIAL FORM
// ======================================

function setupTestimonialForm() {

    const form =
        document.getElementById(
            "testimonial-form"
        );


    const button =
        document.getElementById(
            "testimonial-submit"
        );


    const status =
        document.getElementById(
            "testimonial-status"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const rating =
                document.querySelector(
                    'input[name="rating"]:checked'
                );


            if (!rating) {

                if (status) {

                    status.textContent =
                        "Please select a star rating.";

                }

                return;

            }


            const testimonial = {

                name:
                    document.getElementById(
                        "client-name"
                    ).value.trim(),

                company:
                    document.getElementById(
                        "client-company"
                    ).value.trim(),

                position:
                    document.getElementById(
                        "client-position"
                    ).value.trim(),

                review:
                    document.getElementById(
                        "client-review"
                    ).value.trim(),

                rating:
                    rating.value

            };


            if (
                !testimonial.name ||
                !testimonial.company ||
                !testimonial.review
            ) {

                if (status) {

                    status.textContent =
                        "Please complete all required fields.";

                }

                return;

            }


            try {

                if (button) {

                    button.disabled = true;

                    button.textContent =
                        "Submitting...";

                }


                if (status) {

                    status.textContent =
                        "Submitting your testimonial...";

                }


                /*
                    Google Apps Script is being called
                    with no-cors.

                    Because no-cors responses cannot be
                    read by JavaScript, we simply wait for
                    fetch() to complete.
                */

                await fetch(
                    TESTIMONIALS_POST_URL,
                    {

                        method: "POST",

                        mode: "no-cors",

                        body:
                            new URLSearchParams(
                                testimonial
                            )

                    }
                );


                if (status) {

                    status.textContent =
                        "Thank you! Your testimonial has been submitted for approval.";

                }


                form.reset();


            } catch (error) {

                console.error(
                    "Submission error:",
                    error
                );


                if (status) {

                    status.textContent =
                        "Something went wrong. Please try again.";

                }

            } finally {

                if (button) {

                    button.disabled = false;

                    button.textContent =
                        "Submit Testimonial";

                }

            }

        }
    );

}