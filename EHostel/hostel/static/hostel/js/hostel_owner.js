var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { hideSingleElements, alterAmenity, verifyBooking, hideBookDiv, hideEditElements, newUpdate, } from "./mymodules.js";
let hostel_id = Number(document.querySelector("#hostel_id").textContent);
let bookingDiv = document.querySelector("#hostelBookings");
let availRoomsTd = document.querySelector("#avail_rooms");
let add_amenities_btn = document.querySelector("#add-amenities-btn");
let add_amenities_div = document.querySelector("#add-amenities-div");
let new_amenity_btn = document.querySelector("#new-amenity-btn");
let new_amenity_div = document.querySelector("#new-amenity-div");
let close_amenity_btn = document.querySelector("#close-amenity-btn");
let amenity_display_div = document.querySelector(".amenities-display");
let amenity_global_div = document.querySelector(".amenities-global");
let active_booking_div = document.querySelector("#activeHostelBookings");
function fetchBookings(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url); // Replace with your actual URL
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error("Error fetching bookings:", error);
            throw error;
        }
    });
}
function displayBookings(url, book_div) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetchBookings(url);
            const bookings = data.bookings;
            availRoomsTd.textContent = `${data.vacancies}`;
            if (book_div) {
                book_div.innerHTML = "";
                if (bookings && bookings.length > 0) {
                    let tableBook = document.createElement("table");
                    let titleBook = document.createElement("thead");
                    tableBook.classList.add("table-list-bookies");
                    titleBook.innerHTML +=
                        "<tr><th>Admission Number</th><th>Name</th><th>Email</th><th>Phone number</th><th>Booking status</th><th></th></tr>";
                    tableBook.appendChild(titleBook);
                    let bodyBook = document.createElement("tbody");
                    bookings.forEach((booking) => {
                        let div_status = document.createElement("div");
                        if (booking.status === "Pending") {
                            let btn = document.createElement("button");
                            btn.classList.add("dropbtn");
                            btn.innerText = "Admit?";
                            div_status.appendChild(btn);
                            let div_content = document.createElement("div");
                            div_content.classList.add("dropdown-content");
                            let accept_btn = document.createElement("button");
                            accept_btn.innerText = "Accept";
                            accept_btn.dataset.id = booking.id;
                            accept_btn.classList.add("dropdown-item");
                            accept_btn.classList.add("accept-book-btn");
                            let reject_btn = document.createElement("button");
                            reject_btn.innerText = "Reject";
                            reject_btn.dataset.id = booking.id;
                            reject_btn.classList.add("dropdown-item");
                            reject_btn.classList.add("reject-book-btn");
                            div_content.appendChild(accept_btn);
                            div_content.appendChild(reject_btn);
                            div_status.appendChild(div_content);
                            div_status.classList.add("booking_list_dropdown");
                        }
                        else if (booking.status === "Accept") {
                            let btn = document.createElement("button");
                            btn.classList.add("end-lease-book-btn");
                            btn.innerText = "End Lease?";
                            btn.dataset.id = booking.id;
                            div_status.appendChild(btn);
                        }
                        let tempTr = document.createElement("tr");
                        const adminTd = document.createElement("td");
                        adminTd.textContent = booking.student.admin;
                        tempTr.appendChild(adminTd);
                        const nameTd = document.createElement("td");
                        nameTd.textContent = `${booking.student.first_name} ${booking.student.last_name}`;
                        tempTr.appendChild(nameTd);
                        const emailTd = document.createElement("td");
                        emailTd.textContent = booking.student.email;
                        tempTr.appendChild(emailTd);
                        const contactTd = document.createElement("td");
                        contactTd.textContent = booking.student.contact;
                        tempTr.appendChild(contactTd);
                        const statusTd = document.createElement("td");
                        statusTd.textContent = booking.status;
                        tempTr.appendChild(statusTd);
                        const btnTd = document.createElement("td");
                        btnTd.appendChild(div_status);
                        tempTr.appendChild(btnTd);
                        bodyBook.appendChild(tempTr);
                    });
                    tableBook.appendChild(bodyBook);
                    book_div.appendChild(tableBook);
                }
                else {
                    bookingDiv.innerHTML = "<p>No Students have booked the hostels</p>";
                }
            }
        }
        catch (error) {
            console.error("Error displaying bookings:", error);
            if (document.getElementById("bookings-list")) {
                document.getElementById("bookings-list").innerHTML =
                    "<p>Error loading bookings.</p>";
            }
        }
    });
}
add_amenities_btn.addEventListener("click", () => {
    hideSingleElements(add_amenities_btn, add_amenities_div);
    hideSingleElements(new_amenity_div, new_amenity_btn);
});
new_amenity_btn.addEventListener("click", () => {
    hideSingleElements(new_amenity_btn, new_amenity_div);
});
close_amenity_btn.addEventListener("click", function () {
    hideSingleElements(new_amenity_div, new_amenity_btn);
    hideSingleElements(add_amenities_div, add_amenities_btn);
});
class Amenities {
    constructor() {
        this.hostel_id = hostel_id;
        this.loadAmenity();
    }
    loadAmenity() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`/owner/hostel/${this.hostel_id}/`, {
                    headers: { "X-Requested-With": "XMLHttpRequest" },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = yield response.json();
                this.amenities = data.amenities;
                this.gamenities = data.gamenities;
                this.renderAmenities();
            }
            catch (error) {
                console.error("Error loading amenities: ", error);
            }
        });
    }
    renderAmenities() {
        amenity_display_div.innerHTML = "";
        if (this.amenities.length > 0) {
            let p = document.createElement("p");
            this.amenities.forEach((amenity) => {
                let span = document.createElement("span");
                span.innerHTML = `${amenity.amenity}`;
                span.classList.add("amenity-current-item");
                let del_btn = document.createElement("button");
                del_btn.innerHTML = "X";
                del_btn.addEventListener("click", function () {
                    let myurl1 = `/owner/hostel/${hostel_id}/remove_amenity/${amenity.amenity}/`;
                    alterAmenity(myurl1);
                });
                span.appendChild(del_btn);
                p.appendChild(span);
            });
            amenity_display_div.appendChild(p);
        }
        else {
            amenity_display_div.innerHTML =
                "<p>There are no amenities attached to this hostel</p>";
        }
        amenity_global_div.innerHTML = "";
        if (this.gamenities.length > 0) {
            let p1 = document.createElement("p");
            this.gamenities.forEach((amenity) => {
                let btn = document.createElement("button");
                btn.innerText = amenity.amenity;
                btn.classList.add("amenity-item-btn");
                btn.addEventListener("click", function () {
                    let myurl = `/owner/hostel/${hostel_id}/add_amenity/${amenity.amenity}/`;
                    alterAmenity(myurl);
                });
                p1.appendChild(btn);
            });
            amenity_global_div.appendChild(p1);
        }
        else {
            amenity_global_div.innerHTML =
                "<p>No Amenities available. Please add more</p>";
        }
        this.loadAmenity();
    }
    createAmenity(amenity) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`/api/owner/hostel/amenities/${this.hostel_id}/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amenity: amenity }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = yield response.json();
                if (data.success) {
                    this.loadAmenity();
                }
            }
            catch (error) {
                console.error("Error adding a new amenity", error);
            }
        });
    }
}
const myAmenity = new Amenities();
document
    .querySelector("#submit-amenity-btn")
    .addEventListener("click", function () {
    let amenity = document.querySelector("#amenity-input").value;
    if (amenity) {
        console.log(amenity);
        myAmenity.createAmenity(amenity);
        hideSingleElements(new_amenity_div, new_amenity_btn);
    }
    else {
        console.log("no amenity");
    }
});
let booking_hide_elems = [
    {
        li: document.querySelector("#booking-detail-btn"),
        div: document.querySelector(".bookings-table-list"),
    },
    {
        li: document.querySelector("#booking-active-btn"),
        div: document.querySelector(".booking-active-div"),
    },
    {
        li: document.querySelector("#booking-history-btn"),
        div: document.querySelector(".booking-history-div"),
    },
];
let booking_div_elems = [
    document.querySelector(".bookings-table-list"),
    document.querySelector(".booking-active-div"),
    document.querySelector(".booking-history-div"),
];
booking_hide_elems.forEach((book_hide_elem) => {
    book_hide_elem.li.addEventListener("click", function () {
        hideBookDiv(book_hide_elem.div, booking_div_elems);
    });
});
let booking_urls = [
    { url: `/api/owner/student_bookings/${hostel_id}`, div: bookingDiv },
    {
        url: `/api/owner/student_bookings/${hostel_id}/active/`,
        div: active_booking_div,
    },
];
let updateElementsHostel = [
    {
        editBtn: document.querySelector("#hostel-name-btn"),
        displayClass: document.querySelector(".hostel-name-display"),
        inputClass: document.querySelector(".hostel-name-input"),
        cancelBtn: document.querySelector("#hostel_name_cancel"),
        inputElem: document.querySelector("#hostel-name-inp"),
        subbtn: document.querySelector("#hostel-name-sub"),
        column: "hostel_name"
    }
];
document.addEventListener("DOMContentLoaded", () => {
    updateElementsHostel.forEach(elem => {
        elem.editBtn.addEventListener("click", () => {
            hideEditElements(elem.editBtn, elem.displayClass, elem.inputClass, elem.cancelBtn, "hide-div");
        });
        elem.cancelBtn.addEventListener("click", () => { hideEditElements(elem.cancelBtn, elem.inputClass, elem.displayClass, elem.editBtn, "hide-div"); });
        elem.subbtn.addEventListener("click", () => {
            const url = `/api/owner/hostel_update/${hostel_id}/${elem.column}/`;
            if (elem.column === "") {
                newUpdate(url, elem.column, parseInt(elem.inputElem.value), elem.displayClass);
            }
            else {
                newUpdate(url, elem.column, elem.inputElem.value, elem.displayClass);
            }
            hideEditElements(elem.cancelBtn, elem.inputClass, elem.displayClass, elem.editBtn, "hide-div");
        });
    });
    booking_urls.forEach((book_url) => {
        displayBookings(book_url.url, book_url.div);
        book_url.div.addEventListener("click", function (event) {
            if (event.target instanceof HTMLElement &&
                event.target.classList.contains("accept-book-btn")) {
                verifyBooking(parseInt(event.target.dataset.id), "Accept");
                alert("The student was accepted");
                displayBookings(book_url.url, book_url.div);
            }
            else if (event.target instanceof HTMLElement &&
                event.target.classList.contains("reject-book-btn")) {
                verifyBooking(parseInt(event.target.dataset.id), "Reject");
                alert("The student was rejected");
                displayBookings(book_url.url, book_url.div);
            }
            else if (event.target instanceof HTMLElement &&
                event.target.classList.contains("end-lease-book-btn")) {
                verifyBooking(parseInt(event.target.dataset.id), "End Lease");
                alert("The student lease has ended");
                displayBookings(book_url.url, book_url.div);
            }
        });
    });
});
setInterval(() => {
    // displayBookings(hostel_id)
    booking_urls.forEach((book_url) => {
        displayBookings(book_url.url, book_url.div);
    });
}, 10000);
