// ======================================
// GOOGLE SHEETS API
// ======================================

const MEDIA_API_URL =
    "https://script.google.com/macros/s/AKfycbwK5X7RDn4Z05lhpmd314vRNdLbo0a8nm-VuWQirk91UqtdzH_W05s0KE-RZemgLpzCPg/exec?sheet=Media";


// ======================================
// PAGE LOAD
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    loadMedia();

});


// ======================================
// LOAD MEDIA
// ======================================

async function loadMedia() {

    try {

        const response =
            await fetch(MEDIA_API_URL);

        if (!response.ok) {

            throw new Error(
                `HTTP error: ${response.status}`
            );

        }

        const result =
            await response.json();

        console.log(
            "Media API:",
            result
        );


        if (!result || !Array.isArray(result.data)) {

            throw new Error(
                "Invalid media data received."
            );

        }


        buildFeaturedVideo(result.data);

        buildMedia(result.data);

    } catch (error) {

        console.error(
            "Error loading media:",
            error
        );


        const featured =
            document.getElementById(
                "featured-video-container"
            );

        const media =
            document.getElementById(
                "media-content"
            );


        if (featured) {

            featured.innerHTML = `

                <p class="error-message">

                    Unable to load the latest video.

                </p>

            `;

        }


        if (media) {

            media.innerHTML = `

                <p class="error-message">

                    Unable to load videos right now.

                </p>

            `;

        }

    }

}


// ======================================
// FEATURED VIDEO
// ======================================

function buildFeaturedVideo(data) {

    const container =
        document.getElementById(
            "featured-video-container"
        );

    if (!container) return;


    const featured =
        data.find(video =>

            String(video.Featured)
                .trim()
                .toUpperCase() === "TRUE"

            &&

            String(video.Active)
                .trim()
                .toUpperCase() === "TRUE"

        );


    if (!featured) {

        container.innerHTML = `

            <p class="empty-message">

                No featured video available.

            </p>

        `;

        return;

    }


    const videoId =
        getYouTubeId(
            featured.MediaID
        );


    if (!videoId) {

        container.innerHTML = `

            <p class="error-message">

                Invalid featured video.

            </p>

        `;

        return;

    }


    const card =
        document.createElement("div");

    card.className =
        "featured-video-card";


    const iframe =
        document.createElement("iframe");

    iframe.src =
        `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;

    iframe.title =
        featured.Title || "YouTube video";

    iframe.loading =
        "lazy";

    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

    iframe.allowFullscreen =
        true;


    const title =
        document.createElement("h3");

    title.textContent =
        featured.Title || "Featured Video";


    card.appendChild(iframe);

    card.appendChild(title);

    container.innerHTML = "";

    container.appendChild(card);

}


// ======================================
// BUILD VIDEO SECTIONS
// ======================================

function buildMedia(data) {

    const container =
        document.getElementById(
            "media-content"
        );

    if (!container) return;


    container.innerHTML = "";


    const platforms = [
        "YouTube"
    ];


    platforms.forEach(platform => {

        const videos =
            data.filter(video =>

                String(video.Platform)
                    .trim()
                    .toLowerCase() ===
                    platform.toLowerCase()

                &&

                String(video.Active)
                    .trim()
                    .toUpperCase() === "TRUE"

            );


        if (videos.length === 0) return;


        const section =
            document.createElement("section");

        section.className =
            "platform-section";


        const heading =
            document.createElement("h2");

        heading.textContent =
            platform;


        const grid =
            document.createElement("div");

        grid.className =
            "video-grid";


        videos.forEach(video => {

            const videoId =
                getYouTubeId(
                    video.MediaID
                );


            if (!videoId) return;


            const card =
                document.createElement("article");

            card.className =
                "video-card";


            const iframe =
                document.createElement("iframe");

            iframe.src =
                `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;

            iframe.title =
                video.Title || "YouTube video";

            iframe.loading =
                "lazy";

            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

            iframe.allowFullscreen =
                true;


            const title =
                document.createElement("h3");

            title.textContent =
                video.Title || "Untitled Video";


            card.appendChild(iframe);

            card.appendChild(title);

            grid.appendChild(card);

        });


        section.appendChild(heading);

        section.appendChild(grid);

        container.appendChild(section);

    });


    if (!container.children.length) {

        container.innerHTML = `

            <p class="empty-message">

                No videos available.

            </p>

        `;

    }

}


// ======================================
// GET YOUTUBE VIDEO ID
// ======================================

function getYouTubeId(value) {

    if (!value) return "";


    const url =
        String(value).trim();


    // Already an ID
    if (
        !url.includes("http") &&
        !url.includes("youtu")
    ) {

        return url;

    }


    // Standard YouTube URL
    const watchMatch =
        url.match(
            /[?&]v=([^&]+)/
        );


    if (watchMatch) {

        return watchMatch[1];

    }


    // YouTube embed
    const embedMatch =
        url.match(
            /youtube\.com\/embed\/([^?&/]+)/
        );


    if (embedMatch) {

        return embedMatch[1];

    }


    // YouTube Shorts
    const shortsMatch =
        url.match(
            /youtube\.com\/shorts\/([^?&/]+)/
        );


    if (shortsMatch) {

        return shortsMatch[1];

    }


    // youtu.be
    const shortUrlMatch =
        url.match(
            /youtu\.be\/([^?&/]+)/
        );


    if (shortUrlMatch) {

        return shortUrlMatch[1];

    }


    return "";

}