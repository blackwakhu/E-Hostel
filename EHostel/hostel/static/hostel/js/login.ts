let passwdOwner: HTMLInputElement = document.querySelector<HTMLInputElement>("#passwdOwner")
let passwd1Owner: HTMLInputElement = document.querySelector<HTMLInputElement>("#passwd1Owner")
let submitOwner: HTMLInputElement = document.querySelector<HTMLInputElement>("#submitOwnerBtn")
let telOwner: HTMLInputElement = document.querySelector<HTMLInputElement>("#phone_number_owner") 

let msgElement: HTMLSpanElement = document.querySelector<HTMLSpanElement>("#message")
let msgConfElement: HTMLSpanElement = document.querySelector<HTMLSpanElement>("#messageConf")
let msgTellElement: HTMLSpanElement = document.querySelector<HTMLSpanElement>("#messageTell")

function validatePassword(password: string): boolean {
    const regex = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password)
}

function validateNumber(num: string): boolean {
    const regex = /^(?:\+?254)?(?:0|7|1)(?:(?:[1-9][0-9]{7})|(?:4[0-9]{6}))$/
    return regex.test(num)
}

function checkPasswords(original: HTMLInputElement, confirm: HTMLInputElement, tellinp: HTMLInputElement, submit: HTMLInputElement, msg: HTMLSpanElement, msgConf: HTMLSpanElement, msgTell: HTMLSpanElement) {
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


passwdOwner.addEventListener("input", () => {
    checkPasswords(passwdOwner, passwd1Owner, telOwner, submitOwner, msgElement, msgConfElement, msgTellElement)
})
passwd1Owner.addEventListener("input", () => {
    checkPasswords(passwdOwner, passwd1Owner, telOwner, submitOwner, msgElement, msgConfElement, msgTellElement)
})
telOwner.addEventListener("input", () => {
    checkPasswords(passwdOwner, passwd1Owner, telOwner, submitOwner, msgElement, msgConfElement, msgTellElement)
})


