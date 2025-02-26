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
            console.log(hostel_id);
            // Assuming you have a div with id="bookings-list" to display the bookings
            //   const bookingsListDiv = document.getElementById("bookings-list");
            //   if (bookingsListDiv) {
            //     bookingsListDiv.innerHTML = ""; // Clear previous content
            //     if (bookings && bookings.length > 0) {
            //       bookings.forEach((booking) => {
            //         const bookingItem = document.createElement("div");
            //         bookingItem.innerHTML = `
            //           <p>Booking ID: ${booking.id}</p>
            //           <p>Status: ${booking.status}</p>
            //           <p>Student: ${booking.student}</p>
            //           <hr>
            //         `;
            //         bookingsListDiv.appendChild(bookingItem);
            //       });
            //     } else {
            //       bookingsListDiv.innerHTML = "<p>No bookings found.</p>";
            //     }
            //   } else {
            //     console.error("bookings-list div not found");
            //   }
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
    displayBookings(4); // Replace 4 with the desired hostel ID.
});
