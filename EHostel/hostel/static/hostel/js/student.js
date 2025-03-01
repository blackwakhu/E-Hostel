import { hideDivElements, hideUrlDivElements, hideEditElements } from "./mymodules.js";
let home_btn_student = document.querySelector(".home");
let hostels_btn_student = document.querySelector(".hostels");
let my_hostel_btn_student = document.querySelector(".my-hostel");
let my_account_btn_student = document.querySelector(".my-account");
let home_div_student = document.querySelector(".home-html");
let hostels_div_student = document.querySelector(".hostels-html");
let my_hostel_div_student = document.querySelector(".my-hostel-html");
let my_account_div_student = document.querySelector(".my-account-html");
let divElements_student = [home_div_student, hostels_div_student, my_hostel_div_student, my_account_div_student];
let buttonElements_student = [home_btn_student, hostels_btn_student, my_hostel_btn_student, my_account_btn_student];
let btnObj_student = new Array();
let updateElements = [
    {
        "editBtn": document.querySelector("#stud-fname-btn"),
        "displayClass": document.querySelector(".stud-fname-display"),
        "inputClass": document.querySelector(".stud-fname-input"),
        "cancelBtn": document.querySelector("#stud_fname_cancel")
    }
];
for (let i = 0; i < divElements_student.length; i++) {
    btnObj_student.push({ "button": buttonElements_student[i], "div": divElements_student[i] });
}
document.addEventListener("DOMContentLoaded", () => {
    btnObj_student.forEach((bObj) => {
        if (bObj) {
            bObj.button.addEventListener("click", () => {
                hideDivElements(bObj.button, buttonElements_student, bObj.div, divElements_student);
            });
        }
    });
    hideUrlDivElements(home_div_student, divElements_student);
    updateElements.forEach((elem) => {
        elem.editBtn.addEventListener("click", () => { hideEditElements(elem.editBtn, elem.displayClass, elem.inputClass, elem.cancelBtn, "hide-div"); });
        elem.cancelBtn.addEventListener("click", () => { hideEditElements(elem.cancelBtn, elem.inputClass, elem.displayClass, elem.editBtn, "hide-div"); });
    });
});
