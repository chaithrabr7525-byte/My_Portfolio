/**
 * Enhanced Skills Rendering - Icon-Focused Grid Layout
 * Displays all skills as interactive icons with hover effects and animations
 */
function renderSkills() {
    const skillsContainer = document.getElementById("skills-container");

    if (!skillsContainer) {
        console.error("❌ Skills container not found");
        return;
    }

    // Clear existing content
    skillsContainer.innerHTML = "";

    // Create responsive grid container
    const gridContainer = document.createElement("div");
    gridContainer.className = `
        grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 max-w-4xl mx-auto
        transition-all duration-500 ease-in-out
    `;

    // Enhanced skill colors mapping
    const skillColors = {
        "ReactJS": {
            bg: "from-blue-500 to-cyan-500",
            hover: "hover:from-blue-600 hover:to-cyan-600",
            shadow: "shadow-blue-500/25",
            text: "text-blue-600"
        },
        "JavaScript": {
            bg: "from-yellow-500 to-orange-500",
            hover: "hover:from-yellow-600 hover:to-orange-600",
            shadow: "shadow-yellow-500/25",
            text: "text-yellow-600"
        },
        "Node.js": {
            bg: "from-green-500 to-emerald-500",
            hover: "hover:from-green-600 hover:to-emerald-600",
            shadow: "shadow-green-500/25",
            text: "text-green-600"
        },
        "MongoDB": {
            bg: "from-green-600 to-lime-500",
            hover: "hover:from-green-700 hover:to-lime-600",
            shadow: "shadow-green-600/25",
            text: "text-green-600"
        },
        "Python": {
            bg: "from-blue-600 to-indigo-500",
            hover: "hover:from-blue-700 hover:to-indigo-600",
            shadow: "shadow-blue-600/25",
            text: "text-blue-600"
        },
        "Tailwind CSS": {
            bg: "from-teal-500 to-cyan-500",
            hover: "hover:from-teal-600 hover:to-cyan-600",
            shadow: "shadow-teal-500/25",
            text: "text-teal-600"
        },
        "Git": {
            bg: "from-orange-500 to-red-500",
            hover: "hover:from-orange-600 hover:to-red-600",
            shadow: "shadow-orange-500/25",
            text: "text-orange-600"
        },
        "AI/ML": {
            bg: "from-purple-500 to-pink-500",
            hover: "hover:from-purple-600 hover:to-pink-600",
            shadow: "shadow-purple-500/25",
            text: "text-purple-600"
        }
    };

    // Render each skill as an enhanced icon card
    skillsData.forEach((skill, index) => {
        const skillCard = createSkillIconCard(skill, skillColors[skill.name] || {
            bg: "from-purple-500 to-pink-500",
            hover: "hover:from-purple-600 hover:to-pink-600",
            shadow: "shadow-purple-500/25",
            text: "text-purple-600"
        }, index);

        gridContainer.appendChild(skillCard);
    });

    // Add the grid to the container
    skillsContainer.appendChild(gridContainer);

    console.log("✅ Enhanced skills rendered successfully with", skillsData.length, "skills");
}

/**
 * Create an enhanced skill icon card with animations and hover effects
 * Minimal design with icon-focused display (no background card)
 * @param {Object} skill - Skill data object
 * @param {Object} colors - Color scheme for the skill
 * @param {number} index - Index for animation delay
 * @returns {HTMLElement} Enhanced skill card element
 */
function createSkillIconCard(skill, colors, index) {
    const card = document.createElement("div");

    // Main card container - NO BACKGROUND, just icon-focused
    card.className = `
        group relative flex flex-col items-center justify-center
        transform hover:scale-110
        transition-all duration-300 ease-out cursor-pointer
        py-4
    `;

    // Add AOS animation if available
    card.setAttribute("data-aos", "fade-up");
    card.setAttribute("data-aos-delay", (index * 100).toString());

    // Icon container with enhanced styling
    const iconContainer = document.createElement("div");
    iconContainer.className = `
        relative w-24 h-24 rounded-3xl
        bg-gradient-to-br ${colors.bg} ${colors.hover}
        flex items-center justify-center
        transform group-hover:rotate-12 group-hover:scale-125
        transition-all duration-300 ease-out
        shadow-2xl ${colors.shadow} group-hover:shadow-2xl
        border-2 border-white/30 dark:border-white/10
        backdrop-blur-sm
        before:absolute before:inset-0 before:rounded-3xl
        before:bg-gradient-to-t before:from-black/10 before:to-white/10
        before:opacity-0 before:group-hover:opacity-100
        before:transition-opacity before:duration-300
        group-hover:border-white/60 dark:group-hover:border-white/30
        after:absolute after:inset-0 after:rounded-3xl
        after:bg-gradient-to-br after:from-white/20 after:to-transparent
        after:opacity-100 after:transition-opacity after:duration-300
        mb-6
        ring-4 ring-offset-2 ring-offset-gray-50 dark:ring-offset-gray-950
        ring-white/40 dark:ring-white/20
        group-hover:ring-white/80 dark:group-hover:ring-white/50
    `;

    // Icon text with enhanced typography
    const iconText = document.createElement("span");
    iconText.className = `
        text-5xl font-black text-white drop-shadow-xl
        group-hover:scale-125 transition-transform duration-300
        select-none filter drop-shadow-lg
    `;
    iconText.textContent = skill.shortLabel;

    // Skill name with better typography
    const skillName = document.createElement("h3");
    skillName.className = `
        text-base font-bold text-gray-900 dark:text-white
        group-hover:${colors.text} transition-colors duration-300
        text-center
        opacity-0 group-hover:opacity-100
        transform translate-y-2 group-hover:translate-y-0
        transition-all duration-300
    `;
    skillName.textContent = skill.name;

    // Skill description with improved styling
    const skillDescription = document.createElement("p");
    skillDescription.className = `
        text-xs text-gray-600 dark:text-gray-400 leading-relaxed
        text-center
        opacity-0 group-hover:opacity-100
        transform translate-y-2 group-hover:translate-y-0
        transition-all duration-300 delay-100
        line-clamp-2 max-w-xs px-2 mt-1
    `;
    skillDescription.textContent = skill.description;

    // Animated glow effect on hover
    const glowEffect = document.createElement("div");
    glowEffect.className = `
        absolute inset-0 rounded-3xl
        bg-gradient-to-br ${colors.bg}
        opacity-0 group-hover:opacity-30
        blur-2xl -z-10 -m-4
        transition-all duration-300
        group-hover:scale-150
    `;

    // Assemble the card
    iconContainer.appendChild(iconText);
    card.appendChild(glowEffect);
    card.appendChild(iconContainer);
    card.appendChild(skillName);
    card.appendChild(skillDescription);

    // Add click interaction for mobile
    card.addEventListener("click", () => {
        card.style.transform = "scale(0.95)";
        setTimeout(() => {
            card.style.transform = "";
        }, 150);
    });

    return card;
}