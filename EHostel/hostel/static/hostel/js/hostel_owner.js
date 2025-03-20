var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { hideSingleElements } from "./mymodules.js";
let hostel_id = Number(document.querySelector("#hostel_id").textContent);
let bookingDiv = document.querySelector("#hostelBookings");
let availRoomsTd = document.querySelector("#avail_rooms");
let add_amenities_btn = document.querySelector("#add-amenities-btn");
let add_amenities_div = document.querySelector("#add-amenities-div");
let new_amenity_btn = document.querySelector("#new-amenity-btn");
let new_amenity_div = document.querySelector("#new-amenity-div");
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
                    titleBook.innerHTML += "<tr><th>Admission Number</th><th>Name</th><th>Email</th><th>Phone number</th><th>Booking status</th></tr>";
                    tableBook.appendChild(titleBook);
                    let bodyBook = document.createElement("tbody");
                    bookings.forEach((booking) => {
                        let tempTr = document.createElement("tr");
                        tempTr.innerHTML = `
                        <td>${booking.student.admin}</td>
                        <td>${booking.student.first_name} ${booking.student.last_name}</td>
                        <td>${booking.student.email}</td>
                        <td>${booking.student.contact}</td>
                        <td>${booking.status}</td>
                    `;
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
                document.getElementById("bookings-list").innerHTML = "<p>Error loading bookings.</p>";
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
document.querySelector("#submit-amenity-btn").addEventListener("click", function () {
    let amenity = document.querySelector("#amenity-input").value;
    if (amenity) {
        console.log(amenity);
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
    displayBookings(hostel_id);
}, 5000);
