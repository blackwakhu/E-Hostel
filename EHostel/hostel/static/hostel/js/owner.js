import { hideDivElements, hideUrlDivElements } from "./mymodules.js";
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
document.addEventListener("DOMContentLoaded", () => {
    btnObj.forEach((bObj) => {
        if (bObj !== null) {
            bObj.button.addEventListener("click", () => {
                hideDivElements(bObj.button, buttonElements, bObj.div, divElements);
            });
        }
    });
    hideUrlDivElements(home_div, divElements);
});
