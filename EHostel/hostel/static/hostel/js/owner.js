var home_btn = document.querySelector(".home");
var hostels_btn = document.querySelector(".hostels");
var new_hostel_btn = document.querySelector(".new-hostel");
var my_account_btn = document.querySelector(".my-account");
var home_div = document.querySelector(".home-html");
var hostels_div = document.querySelector(".hostels-html");
var new_hostel_div = document.querySelector(".new-hostel-html");
var my_account_div = document.querySelector(".my-account-html");
var divElements = [home_div, hostels_div, new_hostel_div, my_account_div];
var buttonElements = [home_btn, hostels_btn, new_hostel_btn, my_account_btn];
var btnObj = new Array();
for (var i = 0; i < divElements.length; i++) {
    btnObj.push({ "button": buttonElements[i], "div": divElements[i] });
}
function hideDivElements(btn, buttons, seeDiv, elems) {
    elems.forEach(function (elem) {
        if (!(elem.classList.contains("hide-elem"))) {
            elem.classList.add("hide-elem");
        }
    });
    seeDiv.classList.remove("hide-elem");
}
btnObj.forEach(function (bObj) {
    bObj.button.addEventListener("click", function () {
        hideDivElements(bObj.button, buttonElements, bObj.div, divElements);
    });
});
