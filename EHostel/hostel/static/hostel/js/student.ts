import { url, UpdatedElementsint, hideDivElements, hideUrlDivElements, hideEditElements, handleUpdateClick, validateNumber } from "./mymodules.js" 


// this will reference the menu buttons
let home_btn_student: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".home")
let hostels_btn_student: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".hostels")
let my_hostel_btn_student: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".my-hostel")
let my_account_btn_student: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".my-account")
let search_btn_student: HTMLAnchorElement = document.querySelector<HTMLAnchorElement>(".search")

// this are the major div elements that display information in the student.html file
let home_div_student: HTMLDivElement = document.querySelector<HTMLDivElement>(".home-html")
let hostels_div_student: HTMLDivElement = document.querySelector<HTMLDivElement>(".hostels-html")
let my_hostel_div_student: HTMLDivElement = document.querySelector<HTMLDivElement>(".my-hostel-html")
let my_account_div_student: HTMLDivElement = document.querySelector<HTMLDivElement>(".my-account-html")
let search_div_student: HTMLDivElement = document.querySelector<HTMLDivElement>(".search-html")

// this array includes all the major iv elements that divide the student.html file
let divElements_student: HTMLDivElement[] = [home_div_student, hostels_div_student, my_hostel_div_student, my_account_div_student, search_div_student]

// this array contains all the menu items
let buttonElements_student: HTMLAnchorElement[] = [home_btn_student, hostels_btn_student, my_hostel_btn_student, my_account_btn_student, search_btn_student]

// this array contains a an interface that will the above to be efficiently manipulated
let btnObj_student: { button: HTMLAnchorElement, div: HTMLDivElement }[] = new Array()

let updateElements: UpdatedElementsint[] = [
    {
        editBtn: document.querySelector("#stud-fname-btn"),
        displayClass: document.querySelector(".stud-fname-display"),
        inputClass: document.querySelector(".stud-fname-input"),
        cancelBtn: document.querySelector("#stud_fname_cancel"),
        inputElem: document.querySelector("#stud-fname-inp"),
        subbtn: document.querySelector("#stud-fname-sub"),
        column: "first_name"
    },
    {
        editBtn: document.querySelector("#stud-lname-btn"),
        displayClass: document.querySelector(".stud-lname-display"),
        inputClass: document.querySelector(".stud-lname-input"),
        cancelBtn: document.querySelector("#stud_lname_cancel"),
        inputElem: document.querySelector("#stud-lname-inp"),
        subbtn: document.querySelector("#stud-lname-sub"),
        column: "last_name"
    },
    {
        editBtn: document.querySelector("#stud-email-btn"),
        displayClass: document.querySelector(".stud-email-display"),
        inputClass: document.querySelector(".stud-email-input"),
        cancelBtn: document.querySelector("#stud_email_cancel"),
        inputElem: document.querySelector("#stud-email-inp"),
        subbtn: document.querySelector("#stud-email-sub"),
        column: "email"
    },
    {
        editBtn: document.querySelector("#stud-contact-btn"),
        displayClass: document.querySelector(".stud-contact-display"),
        inputClass: document.querySelector(".stud-contact-input"),
        cancelBtn: document.querySelector("#stud_contact_cancel"),
        inputElem: document.querySelector("#stud-contact-inp"),
        subbtn: document.querySelector("#stud-contact-sub"),
        column: "phone_number"
    }
]

const admin:string =  document.querySelector<HTMLSpanElement>("#stud-admin").textContent

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

    updateElements.forEach((elem) => {
        elem.editBtn.addEventListener("click", () => { hideEditElements(elem.editBtn, elem.displayClass, elem.inputClass, elem.cancelBtn, "hide-div") })
        elem.cancelBtn.addEventListener("click", () => { hideEditElements(elem.cancelBtn, elem.inputClass, elem.displayClass, elem.editBtn, "hide-div") })
        elem.subbtn.addEventListener("click", () => {
            // saveData(elem.inputElem)
            if (elem.column === "phone_number" && !(validateNumber(elem.inputElem.value))) {
                alert("The phone number is not valid")
            } else {
                const elemurl: string = `${url}/api/student/update/${admin}/${elem.column}/`
                handleUpdateClick(elemurl, elem.column, elem.inputElem.value, elem.displayClass)
                hideEditElements(elem.cancelBtn, elem.inputClass, elem.displayClass, elem.editBtn, "hide-div")
            }
        })
    })
    
})




