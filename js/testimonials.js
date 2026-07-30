// ======================================
// GOOGLE SHEETS API
// ======================================

const API_URL = "https://script.google.com/macros/s/AKfycbwK5X7RDn4Z05lhpmd314vRNdLbo0a8nm-VuWQirk91UqtdzH_W05s0KE-RZemgLpzCPg/exec?sheet=Testimonials";

const POST_URL = "https://script.google.com/macros/s/AKfycbwK5X7RDn4Z05lhpmd314vRNdLbo0a8nm-VuWQirk91UqtdzH_W05s0KE-RZemgLpzCPg/exec";





document.addEventListener("DOMContentLoaded", () => {


    loadTestimonials();


    setupTestimonialForm();


});






// ======================================
// LOAD TESTIMONIALS
// ======================================


async function loadTestimonials() {


    try {


        const response = await fetch(API_URL);


        const result = await response.json();



        console.log(
            "Testimonials API:",
            result
        );



        buildTestimonials(result.data);



    } catch (error) {


        console.error(
            "Error loading testimonials:",
            error
        );


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



    if (!container) {


        console.error(
            "Testimonials container not found."
        );


        return;


    }





    container.innerHTML = "";






    if (!data || data.length === 0) {


        container.innerHTML = `

        <p class="review">
            No testimonials available.
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


            <div class="stars">

                ${stars}

            </div>





            <p class="review">

                "${item.Review}"

            </p>







            <div class="client">



                ${avatar}





                <div class="client-details">



                    <h3>

                        ${item.Name}

                    </h3>





                    <p>

                        ${item.Position}

                    </p>





                    <p>

                        ${item.Company}

                    </p>





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


    rating = parseInt(rating) || 5;



    return (

        "★".repeat(rating)

        +

        "☆".repeat(5 - rating)

    );


}










// ======================================
// GET INITIALS
// ======================================


function getInitials(name) {


    if (!name) return "?";



    return name

        .split(" ")

        .map(part =>
            part.charAt(0)
        )

        .join("")

        .substring(0,2)

        .toUpperCase();



}









// ======================================
// TESTIMONIAL FORM SUBMISSION
// ======================================


function setupTestimonialForm(){



    const form =
    document.getElementById(
        "testimonial-form"
    );



    if(!form) return;







    form.addEventListener(
    "submit",
    async function(event){



        event.preventDefault();







        const rating =
        document.querySelector(
            'input[name="rating"]:checked'
        );







        if(!rating){


            alert(
            "Please select a star rating."
            );


            return;


        }









        const testimonial = {



            name:

            document.getElementById(
                "client-name"
            ).value,





            company:

            document.getElementById(
                "client-company"
            ).value,





            position:

            document.getElementById(
                "client-position"
            ).value,





            review:

            document.getElementById(
                "client-review"
            ).value,





            rating:

            rating.value





        };









        try {





await fetch(
    POST_URL,
    {

        method:"POST",

        mode:"no-cors",

        body:

        new URLSearchParams(testimonial)

    }
);








            const text =
            await response.text();





            console.log(
                "Raw submit response:",
                text
            );







            let result;



            try {


                result =
                JSON.parse(text);


            } catch {


                result = {

                    success:false,

                    message:text

                };


            }







            console.log(
                "Submit response:",
                result
            );








            if(result.success){


alert(
"Thank you! Your testimonial has been submitted for approval."
);


form.reset();



            } else {


                alert(

                "Submission failed. Please try again."

                );


            }









        } catch(error) {





            console.error(
                "Submission error:",
                error
            );







            alert(

            "Something went wrong. Please try again."

            );







        }






    });





}