function toggleMenu() {
    var _a;
    (_a = document.querySelector(".nav-links")) === null || _a === void 0 ? void 0 : _a.classList.toggle("active");
}
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function () {
            var _a;
            (_a = document.querySelector(".nav-links")) === null || _a === void 0 ? void 0 : _a.classList.remove("active");
        });
    });
});
