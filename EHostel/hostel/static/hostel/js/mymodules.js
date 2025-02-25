export function hideDivElements(btn, buttons, seeDiv, elems) {
    elems.forEach((elem) => {
        if (!(elem.classList.contains("hide-elem"))) {
            elem.classList.add("hide-elem");
        }
    });
    seeDiv.classList.remove("hide-elem");
}
