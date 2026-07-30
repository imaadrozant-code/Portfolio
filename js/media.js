// ======================================
// GOOGLE SHEETS API
// ======================================

const API_URL = "https://script.google.com/macros/s/AKfycbwK5X7RDn4Z05lhpmd314vRNdLbo0a8nm-VuWQirk91UqtdzH_W05s0KE-RZemgLpzCPg/exec?sheet=Media";

document.addEventListener("DOMContentLoaded", () => {

    loadMedia();

});

// ======================================
// LOAD MEDIA
// ======================================

async function loadMedia() {

    try {

        const response = await fetch(API_URL);
        const result = await response.json();

        console.log("API Response:", result);

        buildFeaturedVideo(result.data);
        buildMedia(result.data);

    } catch (error) {

        console.error("Error loading media:", error);

    }

}

// ======================================
// FEATURED VIDEO
// ======================================

function buildFeaturedVideo(data) {

    const container = document.getElementById("featured-video-container");

    if (!container) return;

    const featured = data.find(video =>
        String(video.Featured).toUpperCase() === "TRUE"
    );

    if (!featured) {

        container.innerHTML = "<p>No featured video available.</p>";
        return;

    }

    const videoId = getYouTubeId(featured.MediaID);

    container.innerHTML = `

        <div class="video-card featured">

            <iframe
                width="100%"
                height="450"
                src="https://www.youtube.com/embed/${videoId}"
                title="${featured.Title}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen>
            </iframe>

            <h3>${featured.Title}</h3>

        </div>

    `;

}

// ======================================
// VIDEO SECTIONS
// ======================================

function buildMedia(data) {

    const container = document.getElementById("media-content");

    container.innerHTML = "";

    const platforms = ["YouTube"];

    platforms.forEach(platform => {

        const videos = data.filter(video =>

            video.Platform === platform &&
            String(video.Active).toUpperCase() === "TRUE"

        );

        if (videos.length === 0) return;

        const section = document.createElement("section");

        section.className = "platform-section";

        section.innerHTML = `<h2>${platform}</h2>`;

        const grid = document.createElement("div");

        grid.className = "video-grid";

        videos.forEach(video => {

            const videoId = getYouTubeId(video.MediaID);

            const card = document.createElement("div");

            card.className = "video-card";

            card.innerHTML = `

                <iframe
                    width="100%"
                    height="250"
                    src="https://www.youtube.com/embed/${videoId}"
                    title="${video.Title}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen>
                </iframe>

                <h3>${video.Title}</h3>

            `;

            grid.appendChild(card);

        });

        section.appendChild(grid);

        container.appendChild(section);

    });

}

// ======================================
// GET YOUTUBE VIDEO ID
// ======================================

function getYouTubeId(url) {

    if (!url) return "";

    if (!url.includes("http")) return url;

    const match = url.match(/[?&]v=([^&]+)/);

    if (match) return match[1];

    const embedMatch = url.match(/embed\/([^?&]+)/);

    if (embedMatch) return embedMatch[1];

    return "";

}