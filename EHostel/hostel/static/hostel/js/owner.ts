let home_btn: HTMLButtonElement = document.querySelector<HTMLButtonElement>(".home")
let hostels_btn: HTMLButtonElement = document.querySelector<HTMLButtonElement>(".hostels")
let new_hostel_btn: HTMLButtonElement = document.querySelector<HTMLButtonElement>(".new-hostel")
let my_account_btn: HTMLButtonElement = document.querySelector<HTMLButtonElement>(".my-account")

let home_div: HTMLDivElement = document.querySelector<HTMLDivElement>(".home-html")
let hostels_div: HTMLDivElement = document.querySelector<HTMLDivElement>(".hostels-html")
let new_hostel_div: HTMLDivElement = document.querySelector<HTMLDivElement>(".new-hostel-html")
let my_account_div: HTMLDivElement = document.querySelector<HTMLDivElement>(".my-account-html")

let divElements: HTMLDivElement[] = [home_div, hostels_div, new_hostel_div, my_account_div]
let buttonElements: HTMLButtonElement[] = [home_btn, hostels_btn, new_hostel_btn, my_account_btn]
let btnObj: { button: HTMLButtonElement, div: HTMLDivElement }[] = new Array()

for (let i = 0; i < divElements.length; i++) {
    btnObj.push({"button": buttonElements[i], "div": divElements[i]})
}

function hideDivElements(btn: HTMLButtonElement, buttons: HTMLButtonElement[], seeDiv: HTMLDivElement, elems: HTMLDivElement[]) {
    elems.forEach((elem) => {
        elem.style.display = "none"
    })
    seeDiv.style.display = 'block'
}

// home_btn.addEventListener("click", () => {
//     hideDivElements(home_btn, buttonElements, home_div, )
// })

btnObj.forEach((bObj) => {
    bObj.button.addEventListener("click", () => {
        hideDivElements(bObj.button, buttonElements, bObj.div, divElements)
    })
})

console.log(hostels_btn)