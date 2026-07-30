// ======================================
// GOOGLE SHEETS API
// ======================================

const PROJECTS_API_URL =
    "https://script.google.com/macros/s/AKfycbz6p4pZR99lZd5Uvm2s_eK0Ca_6rp3bP6U7jkDvAg2ALOwzYyCw2CkyeyI3MPdDn6HgKA/exec?sheet=Projects";


// ======================================
// PAGE LOAD
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    loadProjects();

});


// ======================================
// LOAD PROJECTS
// ======================================

async function loadProjects() {

    const container =
        document.getElementById("projects-container");

    if (!container) return;

    try {

        const response =
            await fetch(PROJECTS_API_URL);

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }

        const result =
            await response.json();

        console.log(
            "Projects API:",
            result
        );

        if (!result || !Array.isArray(result.data)) {

            throw new Error(
                "Invalid projects data received."
            );

        }

        buildProjects(result.data);

    } catch (error) {

        console.error(
            "Error loading projects:",
            error
        );

        container.innerHTML = `

            <p class="error-message">

                Unable to load projects right now.
                Please try again later.

            </p>

        `;

    }

}


// ======================================
// BUILD PROJECTS
// ======================================

function buildProjects(data) {

    const container =
        document.getElementById(
            "projects-container"
        );

    if (!container) return;

    container.innerHTML = "";

    const projects =
        data.filter(project =>

            String(project.Active)
                .trim()
                .toUpperCase() === "TRUE"

        );


    if (projects.length === 0) {

        container.innerHTML = `

            <p class="empty-message">

                No projects available at the moment.

            </p>

        `;

        return;

    }


    projects.forEach(project => {

        const card =
            document.createElement("article");

        card.className =
            "project-card";


        const image =
            document.createElement("img");

        image.src =
            project.Image || "images/projects/default.png";

        image.alt =
            project.Title || "Project preview";

        image.loading = "lazy";


        const content =
            document.createElement("div");

        content.className =
            "project-content";


        const title =
            document.createElement("h2");

        title.textContent =
            project.Title || "Untitled Project";


        const description =
            document.createElement("p");

        description.textContent =
            project.Description ||
            "Project description unavailable.";


        const buttons =
            document.createElement("div");

        buttons.className =
            "project-buttons";


        if (project.Website) {

            const website =
                document.createElement("a");

            website.href =
                project.Website;

            website.target =
                "_blank";

            website.rel =
                "noopener noreferrer";

            website.className =
                "btn-primary";

            website.textContent =
                "Visit Website";

            buttons.appendChild(
                website
            );

        }


        if (project.GitHub) {

            const github =
                document.createElement("a");

            github.href =
                project.GitHub;

            github.target =
                "_blank";

            github.rel =
                "noopener noreferrer";

            github.className =
                "btn-secondary";

            github.textContent =
                "GitHub";

            buttons.appendChild(
                github
            );

        }


        content.appendChild(title);

        content.appendChild(description);

        content.appendChild(buttons);

        card.appendChild(image);

        card.appendChild(content);

        container.appendChild(card);

    });

}