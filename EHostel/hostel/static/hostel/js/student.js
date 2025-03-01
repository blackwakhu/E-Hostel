import { hideDivElements, hideUrlDivElements, hideEditElements, saveData } from "./mymodules.js";
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
        editBtn: document.querySelector("#stud-fname-btn"),
        displayClass: document.querySelector(".stud-fname-display"),
        inputClass: document.querySelector(".stud-fname-input"),
        cancelBtn: document.querySelector("#stud_fname_cancel"),
        formElem: document.querySelector("#stud-fname-form"),
        inputElem: document.querySelector("#stud-fname-inp"),
        subbtn: document.querySelector("#stud-fname-sub"),
        column: "first_name"
    },
    // {
    //     "editBtn": document.querySelector("#stud-lname-btn"),
    //     "displayClass": document.querySelector(".stud-lname-display"),
    //     "inputClass": document.querySelector(".stud-lname-input"),
    //     "cancelBtn": document.querySelector("#stud_lname_cancel")
    // },
    // {
    //     "editBtn": document.querySelector("#stud-email-btn"),
    //     "displayClass": document.querySelector(".stud-email-display"),
    //     "inputClass": document.querySelector(".stud-email-input"),
    //     "cancelBtn": document.querySelector("#stud_email_cancel")
    // },
    // {
    //     "editBtn": document.querySelector("#stud-contact-btn"),
    //     "displayClass": document.querySelector(".stud-contact-display"),
    //     "inputClass": document.querySelector(".stud-contact-input"),
    //     "cancelBtn": document.querySelector("#stud_contact_cancel")
    // }
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
        elem.subbtn.addEventListener("click", () => {
            saveData(elem.inputElem);
            hideEditElements(elem.cancelBtn, elem.inputClass, elem.displayClass, elem.editBtn, "hide-div");
        });
    });
});
