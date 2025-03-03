import { hideDivElements, hideUrlDivElements } from "./mymodules.js"

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

const uname: string = document.querySelector("#owner-uname").textContent

document.addEventListener("DOMContentLoaded", () => {
    btnObj.forEach((bObj) => {
        if (bObj !== null){
            bObj.button.addEventListener("click", () => {
                hideDivElements(bObj.button, buttonElements, bObj.div, divElements)
            })
        }
    })

    hideUrlDivElements(home_div, divElements)
   
})
