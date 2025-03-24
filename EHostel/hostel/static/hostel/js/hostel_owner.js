var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { hideSingleElements, alterAmenity } from "./mymodules.js";
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
function fetchBookings(hostelId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`/api/owner/student_bookings/${hostelId}`); // Replace with your actual URL
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
function displayBookings(hostelId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield fetchBookings(hostelId);
            const bookings = data.bookings;
            availRoomsTd.textContent = `${data.vacancies}`;
            if (bookingDiv) {
                bookingDiv.innerHTML = "";
                if (bookings && bookings.length > 0) {
                    let tableBook = document.createElement("table");
                    let titleBook = document.createElement("thead");
                    titleBook.innerHTML +=
                        "<tr><th>Admission Number</th><th>Name</th><th>Email</th><th>Phone number</th><th>Booking status</th></tr>";
                    tableBook.appendChild(titleBook);
                    let bodyBook = document.createElement("tbody");
                    bookings.forEach((booking) => {
                        let div_status = document.createElement("div");
                        if (booking.status === "Pending") {
                            let btn = document.createElement("button");
                            btn.classList.add("dropbtn");
                            btn.innerText = "Admit?";
                            let div_content = document.createElement("div");
                            div_content.classList.add("dropdown-content");
                            let accept_a;
                            div_status.appendChild(btn);
                            div_status.classList.add("booking_list_dropdown");
                        }
                        let tempTr = document.createElement("tr");
                        const adminTd = document.createElement('td');
                        adminTd.textContent = booking.student.admin;
                        tempTr.appendChild(adminTd);
                        const nameTd = document.createElement('td');
                        nameTd.textContent = `${booking.student.first_name} ${booking.student.last_name}`;
                        tempTr.appendChild(nameTd);
                        const emailTd = document.createElement('td');
                        emailTd.textContent = booking.student.email;
                        tempTr.appendChild(emailTd);
                        const contactTd = document.createElement('td');
                        contactTd.textContent = booking.student.contact;
                        tempTr.appendChild(contactTd);
                        const statusTd = document.createElement('td');
                        statusTd.textContent = booking.status;
                        tempTr.appendChild(statusTd);
                        const btnTd = document.createElement('td');
                        btnTd.appendChild(div_status);
                        tempTr.appendChild(btnTd);
                        bodyBook.appendChild(tempTr);
                    });
                    tableBook.appendChild(bodyBook);
                    bookingDiv.appendChild(tableBook);
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
                let del_btn = document.createElement("button");
                del_btn.innerText = "X";
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
document.addEventListener("DOMContentLoaded", () => {
    displayBookings(hostel_id);
});
setInterval(() => {
    // displayBookings(hostel_id)
}, 5000);
