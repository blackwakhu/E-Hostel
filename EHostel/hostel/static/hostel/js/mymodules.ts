export function hideDivElements(btn: HTMLAnchorElement, buttons: HTMLAnchorElement[], seeDiv: HTMLDivElement, elems: HTMLDivElement[]) {
    elems.forEach((elem) => {
        if (!(elem.classList.contains("hide-elem"))) {
            elem.classList.add("hide-elem")
        }
    })
    seeDiv.classList.remove("hide-elem")
}

export function hideUrlDivElements(defaultDiv: HTMLDivElement, divList: HTMLDivElement []) {
    const hash = window.location.hash.substring(1);
    const targetDiv = document.querySelector<HTMLDivElement>(`.${hash}`);

    if (hash && targetDiv) {
        divList.forEach(elem => elem.classList.add("hide-elem"));
        targetDiv.classList.remove("hide-elem");
    } else {
        defaultDiv.classList.remove("hide-elem");
    }
}