function initThemeToggle(){
    const toggleBtn = document.getElementById("theme-toggle");
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem("portfolio-theme");

    if(savedTheme === "dark"){
        htmlElement.classList.add("dark");
    } else if (savedTheme === "light") {
        htmlElement.classList.remove("dark");
    } else {
        // default to dark if no preference is saved
        htmlElement.classList.add("dark");
    }

    // Update button text initially
    toggleBtn.textContent = htmlElement.classList.contains("dark") ? "Light Mode" : "Dark Mode";

    toggleBtn.addEventListener("click",function(){
        htmlElement.classList.toggle("dark");
        if(htmlElement.classList.contains("dark")){
            localStorage.setItem("portfolio-theme","dark");
            console.log("Dark mode enabled");
            toggleBtn.textContent = "Light Mode";
        }else{
            localStorage.setItem("portfolio-theme","light");
            console.log("Light mode enabled");
            toggleBtn.textContent = "Dark Mode";
        }
    });
}