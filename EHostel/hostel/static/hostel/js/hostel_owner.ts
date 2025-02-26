import { hideUrlDivElements } from "./mymodules";

let booking_hostel_div: HTMLDivElement = document.querySelector<HTMLDivElement>("#hostelBookings")

async function fetchStudents() {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/owner/student_bookings/4")
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json()
        console.log(data)

    } catch (error) {
        console.error("Error fetching students:", error);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (booking_hostel_div) {
        fetchStudents()
    }
})