let passwdOwner: HTMLInputElement = document.querySelector<HTMLInputElement>("#passwdOwner")
let passwd1Owner: HTMLInputElement = document.querySelector<HTMLInputElement>("#passwd1Owner")
let submitOwner: HTMLInputElement = document.querySelector<HTMLInputElement>("#submitOwnerBtn")
let msgElement: HTMLSpanElement = document.querySelector<HTMLSpanElement>("#message")
let msgConfElement: HTMLSpanElement = document.querySelector<HTMLSpanElement>("#messageConf")

function validatePassword(password: string): boolean {
    const regex = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    return regex.test(password)
}

function checkPasswords(original: HTMLInputElement, confirm: HTMLInputElement, submit: HTMLInputElement, msg: HTMLSpanElement, msgConf: HTMLSpanElement) {
    const password: string = original.value
    const password1: string = confirm.value
    const isValid: boolean = validatePassword(password)
    const passmatch: boolean = password === password1

    if (!isValid) {
        msg.textContent = "Password must be at least 8 characters long, contain a letter, a number, and a symbol.";
        msg.style.color = "red";
    } else {
        msg.textContent = "Strong password ✅";
        msg.style.color = "green";
    }

    if (password1.length > 0) {
        if (passmatch) {
            msgConf.textContent = "Passwords match ✅";
            msgConf.style.color = "green";
        } else {
            msgConf.textContent = "Passwords do not match ❌";
            msgConf.style.color = "red";
        }
    } else {
        msgConf.textContent = "";
    }
    submit.disabled = !(isValid && passmatch)

}


passwdOwner.addEventListener("input", () => {
    checkPasswords(passwdOwner, passwd1Owner, submitOwner, msgElement, msgConfElement)
})
passwd1Owner.addEventListener("input", () => {
    checkPasswords(passwdOwner, passwd1Owner, submitOwner, msgElement, msgConfElement)
})



