// ======================================
// GOOGLE SHEETS API
// ======================================

const API_URL =
    "https://script.google.com/macros/s/AKfycbwK5X7RDn4Z05lhpmd314vRNdLbo0a8nm-VuWQirk91UqtdzH_W05s0KE-RZemgLpzCPg/exec?sheet=Testimonials";

const POST_URL =
    "https://script.google.com/macros/s/AKfycbwK5X7RDn4Z05lhpmd314vRNdLbo0a8nm-VuWQirk91UqtdzH_W05s0KE-RZemgLpzCPg/exec";


// ======================================
// PAGE LOAD
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadTestimonials();

        setupTestimonialForm();

    }
);


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
            await fetch(API_URL);


        if (!response.ok) {

            throw new Error(
                "Unable to connect to Google Sheets."
            );

        }


        const result =
            await response.json();


        console.log(
            "Testimonials API:",
            result
        );


        if (!result.success) {

            throw new Error(
                result.message ||
                "Unable to load testimonials."
            );

        }


        buildTestimonials(
            result.data || []
        );


    } catch (error) {

        console.error(
            "Error loading testimonials:",
            error
        );


        container.innerHTML = `

            <p class="review">

                Unable to load testimonials
                at this time.

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

            <p class="review">

                No testimonials available yet.

            </p>

        `;

        return;

    }


    data.forEach(item => {


        const card =
            document.createElement("div");


        card.className =
            "testimonial-card";


        const stars =
            generateStars(item.Rating);


        const avatar = `

            <div class="avatar-placeholder">

                ${getInitials(item.Name)}

            </div>

        `;


        card.innerHTML = `

            <div>

                <div class="stars">

                    ${stars}

                </div>


                <p class="review">

                    "${escapeHTML(item.Review)}"

                </p>

            </div>


            <div class="client">

                ${avatar}

                <div class="client-details">

                    <h3>

                        ${escapeHTML(item.Name)}

                    </h3>


                    ${
                        item.Position
                        ? `<p>
                            ${escapeHTML(item.Position)}
                           </p>`
                        : ""
                    }


                    ${
                        item.Company
                        ? `<p>
                            ${escapeHTML(item.Company)}
                           </p>`
                        : ""
                    }

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


// ======================================
// GENERATE STARS
// ======================================

function generateStars(rating) {

    const value =
        Math.min(
            5,
            Math.max(
                1,
                parseInt(rating) || 5
            )
        );


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


    return name

        .trim()

        .split(/\s+/)

        .map(
            part =>
                part.charAt(0)
        )

        .join("")

        .substring(0, 2)

        .toUpperCase();

}


// ======================================
// SUBMIT TESTIMONIAL
// ======================================

function setupTestimonialForm() {

    const form =
        document.getElementById(
            "testimonial-form"
        );


    if (!form) return;


    form.addEventListener(
        "submit",
        async function(event) {

            event.preventDefault();


            const submitButton =
                form.querySelector(
                    "button[type='submit']"
                );


            const rating =
                document.querySelector(
                    'input[name="rating"]:checked'
                );


            // ----------------------------------
            // VALIDATE RATING
            // ----------------------------------

            if (!rating) {

                alert(
                    "Please select a star rating."
                );

                return;

            }


            // ----------------------------------
            // COLLECT DATA
            // ----------------------------------

            const testimonial = {

                name:
                    document
                    .getElementById(
                        "client-name"
                    )
                    .value
                    .trim(),


                company:
                    document
                    .getElementById(
                        "client-company"
                    )
                    .value
                    .trim(),


                position:
                    document
                    .getElementById(
                        "client-position"
                    )
                    .value
                    .trim(),


                review:
                    document
                    .getElementById(
                        "client-review"
                    )
                    .value
                    .trim(),


                rating:
                    rating.value

            };


            // ----------------------------------
            // VALIDATE REQUIRED FIELDS
            // ----------------------------------

            if (
                !testimonial.name ||
                !testimonial.company ||
                !testimonial.review
            ) {

                alert(
                    "Please complete all required fields."
                );

                return;

            }


            // ----------------------------------
            // DISABLE BUTTON
            // ----------------------------------

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.textContent =
                    "Submitting...";

            }


            try {


                const response =
                    await fetch(
                        POST_URL,
                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/x-www-form-urlencoded"

                            },

                            body:
                                new URLSearchParams(
                                    testimonial
                                )

                        }
                    );


                if (!response.ok) {

                    throw new Error(
                        "Server returned an error."
                    );

                }


                const result =
                    await response.json();


                console.log(
                    "Submit response:",
                    result
                );


                if (result.success) {


                    alert(

                        "Thank you! Your testimonial has been submitted for approval."

                    );


                    form.reset();


                    // Reload approved testimonials
                    loadTestimonials();


                } else {


                    throw new Error(

                        result.message ||
                        "Submission failed."

                    );

                }


            } catch (error) {


                console.error(
                    "Submission error:",
                    error
                );


                /*
                 * IMPORTANT:
                 *
                 * Google Apps Script web apps can
                 * sometimes successfully receive a POST
                 * while the browser cannot read the response
                 * because of cross-origin restrictions.
                 *
                 * We therefore show a useful message
                 * rather than falsely claiming that the
                 * submission definitely failed.
                 */

                alert(

                    "Your testimonial may have been submitted. Please check the sheet before submitting again."

                );


            } finally {


                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        "Submit Testimonial";

                }

            }

        }
    );

}


// ======================================
// ESCAPE HTML
// ======================================

function escapeHTML(value) {

    if (value === null ||
        value === undefined) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}