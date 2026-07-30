// ======================================
// GOOGLE SHEETS API
// ======================================

const API_URL = "https://script.google.com/macros/s/AKfycbz6p4pZR99lZd5Uvm2s_eK0Ca_6rp3bP6U7jkDvAg2ALOwzYyCw2CkyeyI3MPdDn6HgKA/exec?sheet=Projects";

document.addEventListener("DOMContentLoaded", () => {

    loadProjects();

});

// ======================================
// LOAD PROJECTS
// ======================================

async function loadProjects() {

    try {

        const response = await fetch(API_URL);
        const result = await response.json();

        console.log("Projects API:", result);

        buildProjects(result.data);

    } catch (error) {

        console.error("Error loading projects:", error);

    }

}

// ======================================
// BUILD PROJECTS
// ======================================

function buildProjects(data) {

    const container = document.getElementById("projects-container");

    if (!container) return;

    container.innerHTML = "";

    const projects = data.filter(project =>
        String(project.Active).toUpperCase() === "TRUE"
    );

    if (projects.length === 0) {

        container.innerHTML = "<p>No projects available.</p>";
        return;

    }

    projects.forEach(project => {

        const card = document.createElement("div");

        card.className = "project-card";

        card.innerHTML = `

            <img src="${project.Image}" alt="${project.Title}">

            <div class="project-content">

                <h2>${project.Title}</h2>

                <p>${project.Description}</p>

                ${buildButtons(project)}

            </div>

        `;

        container.appendChild(card);

    });

}

// ======================================
// BUILD BUTTONS
// ======================================

function buildButtons(project) {

    let buttons = "";

    if (project.Website) {

        buttons += `

            <a href="${project.Website}"
               target="_blank"
               class="btn-primary">

               Visit Website

            </a>

        `;

    }

    if (project.GitHub) {

        buttons += `

            <a href="${project.GitHub}"
               target="_blank"
               class="btn-secondary">

               GitHub

            </a>

        `;

    }

    return buttons;

}