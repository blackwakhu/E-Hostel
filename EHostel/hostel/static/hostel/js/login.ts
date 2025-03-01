import { validateNumber, validatePassword } from "./mymodules"

let passwdOwner: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#passwdOwner")
let passwd1Owner: HTMLInputElement | null= document.querySelector<HTMLInputElement>("#passwd1Owner")
let submitOwner: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#submitOwnerBtn")
let telOwner: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#phone_number_owner") 

let passwdStudent: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#passwdStudent")
let passwd1Student: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#passwd1Student")
let telStudent: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#phoneNumberStudent")
let submitStudent: HTMLInputElement | null = document.querySelector<HTMLInputElement>("#submitStudent")

let msg: HTMLSpanElement = document.querySelector<HTMLSpanElement>("#message")
let msgConf: HTMLSpanElement = document.querySelector<HTMLSpanElement>("#messageConf")
let msgTell: HTMLSpanElement =  document.querySelector<HTMLSpanElement>("#messageTell")

function checkPasswords(original: HTMLInputElement, confirm: HTMLInputElement, tellinp: HTMLInputElement, submit: HTMLInputElement) {
    const password: string = original.value
    const password1: string = confirm.value
    const tell: string = tellinp.value
    const isValid: boolean = validatePassword(password)
    const passmatch: boolean = password === password1
    const validTell: boolean = validateNumber(tell)

    if (!isValid) {
        msg.textContent = "Password must be at least 8 characters long, contain a letter, a number, and a symbol.❌";
        msg.style.color = "red";
    } else {
        msg.textContent = "Strong password ";
        msg.style.color = "green";
    }

    if (!validTell) {
        msgTell.textContent = "Invalid phone number. Must start with a +254 or 0 followed by 8 numbers❌";
        msgTell.style.color = "red";
    } else {
        msgTell.textContent = "Correct Number";
        msgTell.style.color = "green";
    }

    if (password1.length > 0) {
        if (passmatch) {
            msgConf.textContent = "Passwords match ";
            msgConf.style.color = "green";
        } else {
            msgConf.textContent = "Passwords do not match ❌";
            msgConf.style.color = "red";
        }
    } else {
        msgConf.textContent = "";
    }
    submit.disabled = !(isValid && passmatch && validTell)

}


let logObj: { "elem": HTMLInputElement | null, "status": string }[] = [
    { "elem": passwdOwner, "status": "owner" },
    { "elem": passwd1Owner, "status": "owner" },
    { "elem": telOwner, "status": "owner" },
    { "elem": passwdStudent, "status": "student" },
    { "elem": passwd1Student, "status": "student" },
    { "elem": telStudent, "status": "student"}
]

document.addEventListener('DOMContentLoaded', () => {
    logObj.forEach(element => {
        if (element.elem) {
            element.elem.addEventListener("input", () => {
                if (element.status === "owner") {
                    checkPasswords(passwdOwner, passwd1Owner, telOwner, submitOwner)
                } else {
                    checkPasswords(passwdStudent, passwd1Student, telStudent, submitStudent)
                }
            })
        }
    });
})