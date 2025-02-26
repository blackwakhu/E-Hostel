var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let hostel_id = Number(document.querySelector("#hostel_id").textContent);
let bookingDiv = document.querySelector("#hostelBookings");
function fetchBookings(hostelId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`http://127.0.0.1:8000/api/owner/student_bookings/${hostelId}`); // Replace with your actual URL
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            return data.bookings; // Return the bookings array
        }
        catch (error) {
            console.error("Error fetching bookings:", error);
            throw error; // Rethrow the error to be handled by the caller
        }
    });
}
// Example usage:
function displayBookings(hostelId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const bookings = yield fetchBookings(hostelId);
            console.log(bookings);
            // console.log(hostel_id)
            // Assuming you have a div with id="bookings-list" to display the bookings
            //   const bookingsListDiv = document.getElementById("bookings-list");
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
            // Handle errors from fetchBookings()
            console.error("Error displaying bookings:", error);
            if (document.getElementById("bookings-list")) {
                document.getElementById("bookings-list").innerHTML = "<p>Error loading bookings.</p>";
            }
        }
    });
}
// Example: Call displayBookings with a hostel ID (e.g., 4)
document.addEventListener("DOMContentLoaded", () => {
    displayBookings(hostel_id); // Replace 4 with the desired hostel ID.
});
setInterval(() => {
    displayBookings(hostel_id);
}, 5000);
export {};
