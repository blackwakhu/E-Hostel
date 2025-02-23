let home_btn: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".home")
let hostels_btn: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".hostels")
let new_hostel_btn: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".new-hostel")
let my_account_btn: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".my-account")

let home_div: HTMLDivElement = document.querySelector<HTMLDivElement>(".home-html")
let hostels_div: HTMLDivElement = document.querySelector<HTMLDivElement>(".hostels-html")
let new_hostel_div: HTMLDivElement = document.querySelector<HTMLDivElement>(".new-hostel-html")
let my_account_div: HTMLDivElement = document.querySelector<HTMLDivElement>(".my-account-html")

let divElements: HTMLDivElement[] = [home_div, hostels_div, new_hostel_div, my_account_div]
let buttonElements: HTMLAnchorElement[] = [home_btn, hostels_btn, new_hostel_btn, my_account_btn]
let btnObj: { button: HTMLAnchorElement, div: HTMLDivElement }[] = new Array()

for (let i = 0; i < divElements.length; i++) {
    btnObj.push({"button": buttonElements[i], "div": divElements[i]})
}

function hideDivElements(btn: HTMLAnchorElement, buttons: HTMLAnchorElement[], seeDiv: HTMLDivElement, elems: HTMLDivElement[]) {
    elems.forEach((elem) => {
        elem.style.display = "none"
    })
    seeDiv.style.display = 'block'
}

btnObj.forEach((bObj) => {
    bObj.button.addEventListener("click", () => {
        hideDivElements(bObj.button, buttonElements, bObj.div, divElements)
    })
})

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