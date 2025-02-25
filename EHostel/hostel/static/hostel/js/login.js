let passwdOwner = document.querySelector("#passwdOwner");
let passwd1Owner = document.querySelector("#passwd1Owner");
let submitOwner = document.querySelector("#submitOwnerBtn");
let telOwner = document.querySelector("#phone_number_owner");
let passwdStudent = document.querySelector("#passwdStudent");
let passwd1Student = document.querySelector("#passwd1Student");
let telStudent = document.querySelector("#phoneNumberStudent");
let submitStudent = document.querySelector("#submitStudent");
let msg = document.querySelector("#message");
let msgConf = document.querySelector("#messageConf");
let msgTell = document.querySelector("#messageTell");
function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}
function validateNumber(num) {
    const regex = /^(?:\+?254)?(?:0|7|1)(?:[1-9][0-9]{8})$/;
    return regex.test(num);
}
function checkPasswords(original, confirm, tellinp, submit) {
    const password = original.value;
    const password1 = confirm.value;
    const tell = tellinp.value;
    const isValid = validatePassword(password);
    const passmatch = password === password1;
    const validTell = validateNumber(tell);
    if (!isValid) {
        msg.textContent = "Password must be at least 8 characters long, contain a letter, a number, and a symbol.❌";
        msg.style.color = "red";
    }
    else {
        msg.textContent = "Strong password ";
        msg.style.color = "green";
    }
    if (!validTell) {
        msgTell.textContent = "Invalid phone number. Must start with a +254 or 0 followed by 8 numbers❌";
        msgTell.style.color = "red";
    }
    else {
        msgTell.textContent = "Correct Number";
        msgTell.style.color = "green";
    }
    if (password1.length > 0) {
        if (passmatch) {
            msgConf.textContent = "Passwords match ";
            msgConf.style.color = "green";
        }
        else {
            msgConf.textContent = "Passwords do not match ❌";
            msgConf.style.color = "red";
        }
    }
    else {
        msgConf.textContent = "";
    }
    submit.disabled = !(isValid && passmatch && validTell);
}
let logObj = [
    { "elem": passwdOwner, "status": "owner" },
    { "elem": passwd1Owner, "status": "owner" },
    { "elem": telOwner, "status": "owner" },
    { "elem": passwdStudent, "status": "student" },
    { "elem": passwd1Student, "status": "student" },
    { "elem": telStudent, "status": "student" }
];
document.addEventListener('DOMContentLoaded', () => {
    logObj.forEach(element => {
        if (element.elem) {
            element.elem.addEventListener("input", () => {
                if (element.status === "owner") {
                    checkPasswords(passwdOwner, passwd1Owner, telOwner, submitOwner);
                }
                else {
                    checkPasswords(passwdStudent, passwd1Student, telStudent, submitStudent);
                }
            });
        }
    });
});
