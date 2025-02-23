var passwdOwner = document.querySelector("#passwdOwner");
var passwd1Owner = document.querySelector("#passwd1Owner");
var submitOwner = document.querySelector("#submitOwnerBtn");
var msgElement = document.querySelector("#message");
var msgConfElement = document.querySelector("#messageConf");
function validatePassword(password) {
    var regex = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}
function checkPasswords(original, confirm, submit, msg, msgConf) {
    var password = original.value;
    var password1 = confirm.value;
    var isValid = validatePassword(password);
    var passmatch = password === password1;
    if (!isValid) {
        msg.textContent = "Password must be at least 8 characters long, contain a letter, a number, and a symbol.";
        msg.style.color = "red";
    }
    else {
        msg.textContent = "Strong password ✅";
        msg.style.color = "green";
    }
    if (password1.length > 0) {
        if (passmatch) {
            msgConf.textContent = "Passwords match ✅";
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
    submit.disabled = !(isValid && passmatch);
}
passwdOwner.addEventListener("input", function () {
    checkPasswords(passwdOwner, passwd1Owner, submitOwner, msgElement, msgConfElement);
});
passwd1Owner.addEventListener("input", function () {
    checkPasswords(passwdOwner, passwd1Owner, submitOwner, msgElement, msgConfElement);
});
