export interface UpdatedElementsint {
    editBtn: HTMLButtonElement,
    displayClass: HTMLSpanElement,
    inputClass: HTMLSpanElement,
    cancelBtn: HTMLButtonElement,
    formElem: HTMLFormElement,
    inputElem: HTMLInputElement,
    subbtn: HTMLInputElement,
    column: string
}

export const url: string = "http://127.0.0.1:8001"

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
    
    if (hash) {
        const targetDiv = document.querySelector<HTMLDivElement>(`.${hash}`);

        if (hash && targetDiv) {
            divList.forEach(elem => elem.classList.add("hide-elem"));
            targetDiv.classList.remove("hide-elem");
        } else {
            defaultDiv.classList.remove("hide-elem");
        }
    } else {
        defaultDiv.classList.remove("hide-elem");
    }
}

export function hideEditElements(btn: HTMLButtonElement, visibleClass: HTMLSpanElement, hideClass: HTMLSpanElement, extBtn: HTMLButtonElement, classStr: string) {
    if (hideClass.classList.contains(classStr)) {
        hideClass.classList.remove(classStr)
    } if (extBtn.classList.contains(classStr)) {
        extBtn.classList.remove(classStr)
    }
    visibleClass.classList.add(classStr)
    btn.classList.add(classStr)
}

export function saveData(inp: HTMLInputElement) {
    const data = inp.value
}