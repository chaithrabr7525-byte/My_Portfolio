function initProjectSearch(){
    const searchInput = document.getElementById("project-search");

    if(!searchInput){
        console.log("Search input not found");
        return;
    }

    searchInput.addEventListener("input", function(){
        const value = searchInput.value.toLowerCase();

        const filtered = projectsData.filter(project =>
            project.name.toLowerCase().includes(value)
        );

        renderProjects(filtered);
    });
}