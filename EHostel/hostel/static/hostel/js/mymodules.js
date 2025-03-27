var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function hideDivElements(btn, buttons, seeDiv, elems) {
    elems.forEach((elem) => {
        if (!elem.classList.contains("hide-elem")) {
            elem.classList.add("hide-elem");
        }
    });
    seeDiv.classList.remove("hide-elem");
}
export function hideBookDiv(div, elems) {
    elems.forEach(elem => {
        if (elem.classList.contains("hide-elem")) { }
        else {
            elem.classList.add("hide-elem");
        }
    });
    div.classList.remove("hide-elem");
}
export function hideUrlDivElements(defaultDiv, divList) {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetDiv = document.querySelector(`.${hash}`);
        if (hash && targetDiv) {
            divList.forEach((elem) => elem.classList.add("hide-elem"));
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
export function hideButtonElements(btn, hide_btns) {
    hide_btns.forEach((hide_btn) => {
        hide_btn.style.display = "none";
    });
    btn.style.display = "block";
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
function updateData(myurl, column, newValue) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const csrfToken = (_a = document.querySelector('input[name="csrfmiddlewaretoken"]')) === null || _a === void 0 ? void 0 : _a.value;
        try {
            const response = yield fetch(myurl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken || "", // Include CSRF token
                },
                body: JSON.stringify({ [column]: newValue }), // Dynamically create JSON body
            });
            if (!response.ok) {
                const errorData = yield response.json();
                throw new Error(errorData.message || "Network response was not ok");
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("Error updating student:", error);
            throw error;
        }
    });
}
export function handleUpdateClick(myurl, column, newValue, messageElement) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield updateData(myurl, column, newValue);
            messageElement.textContent = result.output;
        }
        catch (error) {
            let errmsg = error.message || "An error occurred during update.";
            alert(errmsg);
        }
    });
}
export function validatePassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
}
export function validateNumber(num) {
    const regex = /^(?:\+?254)?(?:0|7|1)(?:[1-9][0-9]{8})$/;
    return regex.test(num);
}
export function HostelCard(props) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    const card = document.createElement("div");
    card.classList.add("card");
    const image = document.createElement("img");
    image.src = props.hostel.image || "placeholder-image.jpg"; // Use placeholder if no image
    image.alt = props.hostel.hostel_name;
    card.appendChild(image);
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    const h3 = document.createElement("h3");
    h3.innerText = props.hostel.hostel_name;
    cardContent.appendChild(h3);
    const price = document.createElement("p");
    price.textContent = `Price: ksh. ${props.hostel.price_per_month}/month`;
    cardContent.appendChild(price);
    const locality = document.createElement("p");
    locality.textContent = `Locality: ${props.hostel.locality}`;
    cardContent.appendChild(locality);
    const link = document.createElement("a");
    link.href = `/student/hostel/${props.hostel.id}/`;
    link.classList.add("btn-link");
    link.innerHTML = "See More";
    cardContent.appendChild(link);
    card.appendChild(cardContent);
    cardContainer.appendChild(card);
    return cardContainer;
}
export function hideSingleElements(toHide, toSee) {
    toHide.style.display = "none";
    toSee.style.display = "block";
}
export function alterAmenity(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }
        catch (error) {
            console.error("Error adding a new amenity", error);
        }
    });
}
export function verifyBooking(book_id, choice) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/owner/hostel/book/${book_id}/${choice}/`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }
        catch (error) {
            console.error("Error adding a new amenity", error);
        }
    });
}
export function newUpdate(url, column, value, display) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ "value": value }),
            });
            if (!response.ok) {
                alert(`error ${response.status}`);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            display.textContent = data.output;
        }
        catch (error) {
            alert(error);
            console.error("Error adding a new amenity", error);
        }
    });
}
