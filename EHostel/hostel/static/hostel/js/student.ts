import { hideDivElements, hideUrlDivElements, updateEditElements } from "./mymodules.js" 

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

let updateElements: { editBtn: HTMLButtonElement }[] = [
    {"editBtn": document.querySelector<HTMLButtonElement>("#stud-fname-btn")}
]

for (let i = 0; i < divElements_student.length; i++) {
    btnObj_student.push({"button": buttonElements_student[i], "div": divElements_student[i]})
}

document.addEventListener("DOMContentLoaded", () => {
    btnObj_student.forEach((bObj) => {
        if (bObj){
            bObj.button.addEventListener("click", () => {
                hideDivElements(bObj.button, buttonElements_student, bObj.div, divElements_student)
            })
        }
    })

    hideUrlDivElements(home_div_student, divElements_student)
    
})

updateElements.forEach((elem) => {
    
})


