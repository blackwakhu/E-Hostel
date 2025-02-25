var home_btn_student = document.querySelector(".home");
var hostels_btn_student = document.querySelector(".hostels");
var my_hostel_btn_student = document.querySelector(".my-hostel");
var my_account_btn_student = document.querySelector(".my-account");
var home_div_student = document.querySelector(".home-html");
var hostels_div_student = document.querySelector(".hostels-html");
var my_hostel_div_student = document.querySelector(".my-hostel-html");
var my_account_div_student = document.querySelector(".my-account-html");
var divElements_student = [home_div_student, hostels_div_student, my_hostel_div_student, my_account_div_student];
var buttonElements_student = [home_btn_student, hostels_btn_student, my_hostel_btn_student, my_account_btn_student];
var btnObj_student = new Array();
for (var i = 0; i < divElements_student.length; i++) {
    btnObj_student.push({ "button": buttonElements_student[i], "div": divElements_student[i] });
}
function hideDivElements_student(btn, buttons, seeDiv, elems) {
    elems.forEach(function (elem) {
        if (!(elem.classList.contains("hide-elem"))) {
            elem.classList.add("hide-elem");
        }
    });
    seeDiv.classList.remove("hide-elem");
}
btnObj_student.forEach(function (bObj) {
    bObj.button.addEventListener("click", function () {
        hideDivElements_student(bObj.button, buttonElements_student, bObj.div, divElements_student);
    });
});
