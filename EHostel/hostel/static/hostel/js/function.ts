function toggleMenu ()  {
    document.querySelector(".nav-links")?.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function() {
            document.querySelector(".nav-links")?.classList.remove("active");
        });
    });
});