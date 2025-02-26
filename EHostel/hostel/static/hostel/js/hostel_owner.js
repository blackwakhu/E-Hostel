var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let booking_hostel_div = document.querySelector("#hostelBookings");
function fetchStudents() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://127.0.0.1:8000/api/owner/student_bookings/4");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = yield response.json();
            console.log(data);
        }
        catch (error) {
            console.error("Error fetching students:", error);
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    if (booking_hostel_div) {
        fetchStudents();
    }
});
export {};
