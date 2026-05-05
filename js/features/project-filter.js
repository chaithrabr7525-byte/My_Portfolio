function initProjectFilter(){
    const filterContainer = document.getElementById("project-filters");

    if(!filterContainer){
        console.log("Filter container not found");
        return;
    }

    // =====Portfolio Project V3.0 assignment =======
    const categories = ["All", "MERN", "Frontend", "JavaScript"];

    categories.forEach(category => {
        const btn = document.createElement("button");

        btn.textContent = category;
        btn.className = "px-4 py-2 bg-blue-200 rounded";

        btn.addEventListener("click", function(){
            if(category === "All"){
                renderProjects(projectsData);
            } else {
                const filtered = projectsData.filter(p => p.category === category);
                renderProjects(filtered);
            }
        });

        filterContainer.appendChild(btn);
    });
}