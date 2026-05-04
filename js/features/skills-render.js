function renderSkills(){
    const skillsContainer = document.getElementById("skills-container");

    if(!skillsContainer){
        console.log("Skills Contianer not found");
        return;
    }
    skillsContainer.innerHTML = "";
    skillsData.forEach(function(skill){
        // to create outer card 
        const card = document.createElement("div");
        card.className = "p-8 text-center bg-white rounded-3xl shadow-lg";

        // create icon 
        const iconBox = document.createElement("div");
        iconBox.className = "w-20 h-20 mx-auto mb-4 bg-green-900 rounded-2xl flex item-center justify-center";

        // create icon 
        const iconText = document.createElement("span");
        iconText.className = "text-2xl text-white font-bold"
        iconText.textContent = skill.shortLabel;

        // Put iconText inside iconBox
        iconBox.appendChild(iconText);

        // create a skill name 
        const skillsName = document.createElement("h3");
        skillsName.className = "text-xl font-bold mb-2";
        skillsName.textContent = skill.name;

        // create skill description
        const skillDescription = document.createElement("p");
        skillDescription.className = "text-sm";
        skillDescription.textContent = skill.description;

        // append all child elements to card 
        card.appendChild(iconBox);
        card.appendChild(skillsName);
        card.appendChild(skillDescription);

        // append card to skills container 
        skillsContainer.appendChild(card);
    });
    console.log("Skills rendered successfully");
}