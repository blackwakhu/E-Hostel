import { hideDivElements, hideUrlDivElements, hideEditElements, url, validateNumber } from "./mymodules.js";
let home_btn = document.querySelector(".home");
let hostels_btn = document.querySelector(".hostels");
let new_hostel_btn = document.querySelector(".new-hostel");
let my_account_btn = document.querySelector(".my-account");
let home_div = document.querySelector(".home-html");
let hostels_div = document.querySelector(".hostels-html");
let new_hostel_div = document.querySelector(".new-hostel-html");
let my_account_div = document.querySelector(".my-account-html");
let divElements = [home_div, hostels_div, new_hostel_div, my_account_div];
let buttonElements = [home_btn, hostels_btn, new_hostel_btn, my_account_btn];
let btnObj = new Array();
for (let i = 0; i < divElements.length; i++) {
    btnObj.push({ "button": buttonElements[i], "div": divElements[i] });
}
let updateElementsOwner = [
    {
        editBtn: document.querySelector("#owner-fname-btn"),
        displayClass: document.querySelector(".owner-fname-display"),
        inputClass: document.querySelector(".owner-fname-input"),
        cancelBtn: document.querySelector("#owner_fname_cancel"),
        inputElem: document.querySelector("#owner-fname-inp"),
        subbtn: document.querySelector("#owner-fname-sub"),
        column: "first_name"
    },
    {
        editBtn: document.querySelector("#owner-lname-btn"),
        displayClass: document.querySelector(".owner-lname-display"),
        inputClass: document.querySelector(".owner-lname-input"),
        cancelBtn: document.querySelector("#owner_lname_cancel"),
        inputElem: document.querySelector("#owner-lname-inp"),
        subbtn: document.querySelector("#owner-lname-sub"),
        column: "last_name"
    },
    {
        editBtn: document.querySelector("#owner-email-btn"),
        displayClass: document.querySelector(".owner-email-display"),
        inputClass: document.querySelector(".owner-email-input"),
        cancelBtn: document.querySelector("#owner_email_cancel"),
        inputElem: document.querySelector("#owner-email-inp"),
        subbtn: document.querySelector("#owner-email-sub"),
        column: "email"
    },
    {
        editBtn: document.querySelector("#owner-contact-btn"),
        displayClass: document.querySelector(".owner-contact-display"),
        inputClass: document.querySelector(".owner-contact-input"),
        cancelBtn: document.querySelector("#owner_contact_cancel"),
        inputElem: document.querySelector("#owner-contact-inp"),
        subbtn: document.querySelector("#owner-contact-sub"),
        column: "phone_number"
    }
];
const uname = document.querySelector("#owner-uname").textContent;
document.addEventListener("DOMContentLoaded", () => {
    btnObj.forEach((bObj) => {
        if (bObj !== null) {
            bObj.button.addEventListener("click", () => {
                hideDivElements(bObj.button, buttonElements, bObj.div, divElements);
            });
        }
    });
    hideUrlDivElements(home_div, divElements);
    updateElementsOwner.forEach((elem) => {
        elem.editBtn.addEventListener("click", () => { hideEditElements(elem.editBtn, elem.displayClass, elem.inputClass, elem.cancelBtn, "hide-div"); });
        elem.cancelBtn.addEventListener("click", () => { hideEditElements(elem.cancelBtn, elem.inputClass, elem.displayClass, elem.editBtn, "hide-div"); });
        elem.subbtn.addEventListener("click", () => {
            // saveData(elem.inputElem)
            if (elem.column === "phone_number" && !(validateNumber(elem.inputElem.value))) {
                alert("The phone number is not valid");
            }
            else {
                const elemurl = `${url}/api/student/update/${uname}/${elem.column}/`;
                // handleUpdateClick(elemurl, elem.column, elem.inputElem.value, elem.displayClass)
                hideEditElements(elem.cancelBtn, elem.inputClass, elem.displayClass, elem.editBtn, "hide-div");
            }
        });
    });
});
