// ======================================
// CONTACT FORM
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("contact-form");

    const button =
        document.getElementById("contact-submit");

    const status =
        document.getElementById("contact-status");


    if (!form) return;


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            if (status) {

                status.textContent =
                    "Contact form is currently being configured.";

            }


            if (button) {

                button.disabled = true;

                button.textContent =
                    "Coming Soon...";

            }


            setTimeout(() => {

                if (button) {

                    button.disabled = false;

                    button.textContent =
                        "Send Message";

                }

            }, 2000);

        }
    );

});