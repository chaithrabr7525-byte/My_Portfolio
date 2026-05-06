/**
 * ============================================
 * Portfolio Main JavaScript - v2.0
 * ============================================
 * Comprehensive portfolio functionality including:
 * - Project rendering with animations
 * - Education carousel slider
 * - Toast notifications
 * - Back-to-top button
 * - GitHub stats integration
 */

// ============================================
// INITIALIZATION & APP SETUP
// ============================================

document.addEventListener("DOMContentLoaded", function() {
    initializeApp();
});

/**
 * Initialize all app components on page load
 */
function initializeApp() {
    try {
        renderSkills();
        initModal();
        initContactValidation();
        initThemeToggle();
        initProjectSearch();
        initProjectFilter();
        typing();
        initEducationSlider();
        renderProjects(projectsData);
        createToastContainer();
        initBackToTop();
        fetchGithubStats();
        
        console.log("✓ Portfolio initialized successfully");
    } catch (error) {
        console.error("✗ Initialization error:", error);
    }
}

// ============================================
// TOAST NOTIFICATION SYSTEM
// ============================================

/**
 * Create a toast notification container
 */
function createToastContainer() {
    if (!document.getElementById("toast-container")) {
        const container = document.createElement("div");
        container.id = "toast-container";
        container.className = "fixed top-6 right-6 z-50 space-y-3";
        document.body.appendChild(container);
    }
}

/**
 * Display a toast notification
 * @param {string} msg - Message to display
 * @param {string} type - Type: success, error, info
 */
function showToast(msg, type = "success") {
    const container = document.getElementById("toast-container");
    
    if (!container) {
        createToastContainer();
    }

    const toast = document.createElement("div");
    const bgColorMap = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
        warning: "bg-yellow-500"
    };
    const bgColor = bgColorMap[type] || bgColorMap.info;

    toast.className = `
        ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg 
        transition-all duration-300 animate-pulse font-medium
        transform translate-x-0 opacity-100
    `;
    toast.textContent = msg;

    const container_final = document.getElementById("toast-container");
    container_final.appendChild(toast);

    // Auto dismiss
    setTimeout(() => {
        toast.style.animation = "slideOut 0.3s ease-out";
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// PROJECT RENDERING
// ============================================

/**
 * Render project cards with dynamic content
 * @param {Array} data - Array of project objects
 */
function renderProjects(data) {
    const container = document.getElementById("projects-container");

    if (!container) {
        console.error("✗ Projects container not found");
        return;
    }

    container.innerHTML = "";

    // Empty state
    if (!data || data.length === 0) {
        container.innerHTML = `
            <div class="col-span-full text-center py-12">
                <p class="text-gray-500 dark:text-gray-400 text-lg">
                    📭 No projects found
                </p>
            </div>
        `;
        return;
    }

    // Render each project
    data.forEach((project, index) => {
        const card = createProjectCard(project, index);
        container.appendChild(card);
    });

    // Reinitialize AOS for new elements
    if (window.AOS) {
        AOS.refresh();
    }
}

/**
 * Create a project card element
 * @param {Object} project - Project data
 * @param {number} index - Project index for animation delay
 * @returns {HTMLElement} Project card element
 */
function createProjectCard(project, index) {
    const card = document.createElement("div");
    
    // Get project data
    const status = project.status || "Active";
    const statusColor = getStatusColor(status);
    const techStack = project.technologies || [];

    // Build card HTML
    card.className = `
        project-card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg 
        hover:shadow-2xl hover:-translate-y-2 
        transition-all duration-300 border border-gray-200 dark:border-gray-700
        overflow-hidden group cursor-pointer
    `;
    
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", (index * 100).toString());

    card.innerHTML = `
        <!-- Status Badge -->
        <div class="absolute top-0 right-0 ${statusColor} px-4 py-1 rounded-bl-lg text-xs font-bold uppercase tracking-wide">
            ${status}
        </div>

        <!-- Main Content -->
        <div class="relative pt-6">
            
            <!-- Project Title -->
            <h3 class="text-2xl font-bold mb-3 pr-24 text-gray-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                ${escapeHtml(project.name)}
            </h3>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2 h-10">
                ${escapeHtml(project.description)}
            </p>

            <!-- Tech Stack Section -->
            <div class="mb-5">
                <p class="text-xs font-bold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">
                    🛠️ Tech Stack
                </p>
                <div class="flex flex-wrap gap-2">
                    ${techStack.map(tech => `
                        <span class="inline-block bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 
                            text-xs px-3 py-1 rounded-full font-semibold border border-blue-200 dark:border-blue-800/50">
                            ${escapeHtml(tech)}
                        </span>
                    `).join("")}
                </div>
            </div>

            
                </a>
            </div>
        </div>
    `;

    return card;
}

/**
 * Get status badge color based on project status
 * @param {string} status - Project status
 * @returns {string} Tailwind color classes
 */
function getStatusColor(status) {
    const statusColors = {
        "Active": "bg-green-500/20 text-green-700 dark:text-green-400",
        "In Progress": "bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
        "Completed": "bg-blue-500/20 text-blue-700 dark:text-blue-400",
        "Paused": "bg-gray-500/20 text-gray-700 dark:text-gray-400"
    };
    
    return statusColors[status] || statusColors["Active"];
}

/**
 * Escape HTML special characters
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

// ============================================
// EDUCATION CAROUSEL SLIDER
// ============================================

/**
 * Initialize education slider functionality
 */
function initEducationSlider() {
    const slides = document.querySelectorAll(".education-slider .slide");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    if (!slides.length || !prevBtn || !nextBtn) {
        console.warn("⚠ Education slider elements not found");
        return;
    }

    let currentSlide = 0;

    /**
     * Display specific slide
     * @param {number} index - Slide index
     */
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove("active"));
        slides[index].classList.add("active");
    }

    // Previous button
    prevBtn.addEventListener("click", () => {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    });

    // Next button
    nextBtn.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        } else if (e.key === "ArrowRight") {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }
    });

    console.log("✓ Education slider initialized");
}

// ============================================
// BACK TO TOP BUTTON
// ============================================

/**
 * Initialize back-to-top button
 */
function initBackToTop() {
    const existingBtn = document.getElementById("backToTop");
    if (existingBtn) {
        existingBtn.remove();
    }

    const topBtn = document.createElement("button");
    topBtn.id = "backToTop";
    topBtn.className = `
        fixed bottom-8 right-8 z-40 
        bg-gradient-to-r from-blue-500 to-purple-600 
        hover:from-blue-600 hover:to-purple-700
        text-white p-4 rounded-full shadow-lg hover:shadow-2xl 
        transform hover:scale-110 transition-all duration-300 
        hidden font-bold text-xl
    `;
    topBtn.innerHTML = "↑";
    topBtn.title = "Back to Top (Press or Click)";
    topBtn.setAttribute("aria-label", "Back to top");
    
    document.body.appendChild(topBtn);

    // Show/hide button on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            topBtn.classList.remove("hidden");
        } else {
            topBtn.classList.add("hidden");
        }
    });

    // Scroll to top
    topBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Keyboard shortcut (Space/Home)
    document.addEventListener("keydown", (e) => {
        if ((e.key === " " || e.key === "Home") && window.scrollY > 300) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    console.log("✓ Back-to-top button initialized");
}

// ============================================
// GITHUB STATS INTEGRATION
// ============================================

/**
 * Fetch and display GitHub profile statistics
 */
function fetchGithubStats() {
    const statsElement = document.getElementById("github-stats");
    if (!statsElement) return;

    const username = "chaithrabr7525-byte";

    fetch(`https://chaithrabr.github.com/users/${username}`)
        .then(res => {
            if (!res.ok) throw new Error("Network response was not ok");
            return res.json();
        })
        .then(data => {
            if (data.message) {
                console.warn("GitHub API rate limited or error");
                return;
            }

            statsElement.innerHTML = `
                <div class="flex gap-4 justify-center text-sm font-semibold">
                    <span class="flex items-center gap-1">
                        <span class="text-lg">📊</span>
                        <span>${data.public_repos} Repositories</span>
                    </span>
                    <span class="flex items-center gap-1">
                        <span class="text-lg">👥</span>
                        <span>${data.followers} Followers</span>
                    </span>
                    <span class="flex items-center gap-1">
                        <span class="text-lg">⭐</span>
                        <span>${data.public_gists} Gists</span>
                    </span>
                </div>
            `;
            console.log("✓ GitHub stats loaded successfully");
        })
        .catch(err => {
            console.warn("⚠ GitHub stats could not be fetched:", err);
            // Silently fail - this is optional
        });
}

// ============================================
// END OF MAIN.JS
// ============================================