export const url = "http://127.0.0.1:8001";
export function hideDivElements(btn, buttons, seeDiv, elems) {
    elems.forEach((elem) => {
        if (!(elem.classList.contains("hide-elem"))) {
            elem.classList.add("hide-elem");
        }
    });
    seeDiv.classList.remove("hide-elem");
}
export function hideUrlDivElements(defaultDiv, divList) {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetDiv = document.querySelector(`.${hash}`);
        if (hash && targetDiv) {
            divList.forEach(elem => elem.classList.add("hide-elem"));
            targetDiv.classList.remove("hide-elem");
        }
        else {
            defaultDiv.classList.remove("hide-elem");
        }
    }
    else {
        defaultDiv.classList.remove("hide-elem");
    }
}
export function hideEditElements(btn, visibleClass, hideClass, extBtn, classStr) {
    if (hideClass.classList.contains(classStr)) {
        hideClass.classList.remove(classStr);
    }
    if (extBtn.classList.contains(classStr)) {
        extBtn.classList.remove(classStr);
    }
    visibleClass.classList.add(classStr);
    btn.classList.add(classStr);
}
export function saveData(inp) {
    const data = inp.value;
}
