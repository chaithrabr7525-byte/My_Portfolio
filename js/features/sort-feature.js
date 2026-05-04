// ===== SORT FEATURE =====
const sortDropdown = document.getElementById("project-sort");

if(sortDropdown){
    sortDropdown.addEventListener("change", function(e){
        let sorted = [...projectsData];

        if(e.target.value === "name"){
            sorted.sort((a,b)=> a.name.localeCompare(b.name));
        }

        if(e.target.value === "likes"){
            sorted.sort((a,b)=> getLikes(b.id) - getLikes(a.id));
        }

        renderProjects(sorted);
    });
}