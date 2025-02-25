var passwdOwner = document.querySelector("#passwdOwner");
var passwd1Owner = document.querySelector("#passwd1Owner");
var submitOwner = document.querySelector("#submitOwnerBtn");
var telOwner = document.querySelector("#phone_number_owner");
var msgElement = document.querySelector("#message");
var msgConfElement = document.querySelector("#messageConf");
var msgTellElement = document.querySelector("#messageTell");
function validatePassword(password) {
    var regex = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}
function validateNumber(num) {
    var regex = /^(?:\+?254)?(?:0|7|1)(?:(?:[1-9][0-9]{7})|(?:4[0-9]{6}))$/;
    return regex.test(num);
}
function checkPasswords(original, confirm, tellinp, submit, msg, msgConf, msgTell) {
    var password = original.value;
    var password1 = confirm.value;
    var tell = tellinp.value;
    var isValid = validatePassword(password);
    var passmatch = password === password1;
    var validTell = validateNumber(tell);
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
passwdOwner.addEventListener("input", function () {
    checkPasswords(passwdOwner, passwd1Owner, telOwner, submitOwner, msgElement, msgConfElement, msgTellElement);
});
passwd1Owner.addEventListener("input", function () {
    checkPasswords(passwdOwner, passwd1Owner, telOwner, submitOwner, msgElement, msgConfElement, msgTellElement);
});
telOwner.addEventListener("input", function () {
    checkPasswords(passwdOwner, passwd1Owner, telOwner, submitOwner, msgElement, msgConfElement, msgTellElement);
});
