import { hideDivElements } from "./mymodules.js" 

let home_btn_student: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".home")
let hostels_btn_student: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".hostels")
let my_hostel_btn_student: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".my-hostel")
let my_account_btn_student: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".my-account")

let home_div_student: HTMLDivElement = document.querySelector<HTMLDivElement>(".home-html")
let hostels_div_student: HTMLDivElement = document.querySelector<HTMLDivElement>(".hostels-html")
let my_hostel_div_student: HTMLDivElement = document.querySelector<HTMLDivElement>(".my-hostel-html")
let my_account_div_student: HTMLDivElement = document.querySelector<HTMLDivElement>(".my-account-html")

let divElements_student: HTMLDivElement[] = [home_div_student, hostels_div_student, my_hostel_div_student, my_account_div_student]
let buttonElements_student: HTMLAnchorElement[] = [home_btn_student, hostels_btn_student, my_hostel_btn_student, my_account_btn_student]
let btnObj_student: { button: HTMLAnchorElement, div: HTMLDivElement }[] = new Array()

for (let i = 0; i < divElements_student.length; i++) {
    btnObj_student.push({"button": buttonElements_student[i], "div": divElements_student[i]})
}

btnObj_student.forEach((bObj) => {
    bObj.button.addEventListener("click", () => {
        hideDivElements(bObj.button, buttonElements_student, bObj.div, divElements_student)
    })
})

