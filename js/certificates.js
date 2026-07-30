// ======================================
// CERTIFICATES
// ======================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const container =
            document.getElementById(
                "certificates-container"
            );


        if (!container) return;


        /*
            Certificates will be connected here
            once the Google Sheets certificate
            structure is confirmed.
        */

        container.innerHTML = `

            <p class="loading-message">

                Professional certificates will be
                displayed here.

            </p>

        `;

    }
);