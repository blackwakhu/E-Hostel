import { hideDivElements } from "./mymodules.js";
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
});
