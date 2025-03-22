var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b, _c;
import { hideButtonElements } from "./mymodules.js";
const hostel_id = parseInt(((_a = document.getElementById('hostel-id')) === null || _a === void 0 ? void 0 : _a.dataset.hostelId) || '');
const admin_number = ((_b = document.getElementById('hostel-id')) === null || _b === void 0 ? void 0 : _b.dataset.admissionNumber) || '';
let booking_status_div = document.querySelector(".booking-status-div");
let booking_btn_pending = document.querySelector("#booking-pending-btn");
let booking_btn_cancel = document.querySelector("#booking-cancel-btn");
let booking_btn_list = [booking_btn_pending, booking_btn_cancel];
class HostelReviews {
    constructor() {
        this.hostel_id = hostel_id;
        this.loadReviews();
    }
    loadReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`/student/hostel/${this.hostel_id}/`, {
                    headers: { 'X-Requested-With': 'XMLHttpRequest' },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = yield response.json();
                this.reviews = data.reviews;
                this.renderReviews();
            }
            catch (error) {
                console.error('Error loading reviews:', error);
            }
        });
    }
    renderReviews() {
        const reviewsContainer = document.getElementById('reviews-container');
        if (!reviewsContainer)
            return;
        reviewsContainer.innerHTML = '';
        this.reviews.forEach((review) => {
            const reviewElement = this.createReviewElement(review);
            reviewsContainer.appendChild(reviewElement);
        });
    }
    createReviewElement(review) {
        const reviewElement = document.createElement('div');
        reviewElement.innerHTML = `
            <p><strong>${review.student}</strong> (${review.rating} stars) - ${review.comment}</p>
            <button class="reply-button" data-review-id="${review.id}">Reply</button>
            <div id="reply-form-${review.id}" style="display: none;">
                <input type="text" id="reply-comment-${review.id}" placeholder="Reply comment">
                <input type="number" id="reply-rating-${review.id}" placeholder="Reply rating">
                <button class="submit-reply" data-review-id="${review.id}">Submit Reply</button>
            </div>
            <div id="replies-${review.id}"></div>
        `;
        review.replies.forEach((reply) => {
            var _a;
            const replyElement = document.createElement('div');
            replyElement.innerHTML = `<p><strong>${reply.student}</strong> (${reply.rating} stars) - ${reply.comment}</p>`;
            (_a = document.getElementById(`replies-${review.id}`)) === null || _a === void 0 ? void 0 : _a.appendChild(replyElement);
        });
        return reviewElement;
    }
}
function createReview(comment_1, rating_1) {
    return __awaiter(this, arguments, void 0, function* (comment, rating, parent_id = null) {
        const url = "/student/hostel/comment/create/"; // Adjust the URL to your API endpoint
        const reviewData = {
            student_id: admin_number,
            hostel_id: hostel_id,
            comment: comment,
            rating: rating,
            parent_id: parent_id
        };
        try {
            const response = yield fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reviewData)
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = yield response.json();
            console.log("Review added successfully:", result);
        }
        catch (error) {
            console.error("Error adding review:", error);
        }
    });
}
(_c = document.getElementById('add-review-button')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    const comment = document.querySelector('#review-comment').value;
    const rating = parseInt(document.querySelector('#review-rating').value);
    createReview(comment, rating);
});
new HostelReviews();
function booking_status(admin, hostel) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `/api/student/book/status/${admin}/${hostel}/`;
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = yield response.json();
            if (result.status === null || result.status === "Cancel") {
                console.log("pending");
                hideButtonElements(booking_btn_pending, booking_btn_list);
            }
            else if (result.status == "Pending") {
                console.log("cancel");
                hideButtonElements(booking_btn_cancel, booking_btn_list);
            }
        }
        catch (error) {
            console.error("Error adding review:", error);
        }
    });
}
function booking_status_change(admin, hostel, status) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const url = `/api/student/book/status/${admin}/${hostel}/${status}/`;
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = yield response.json();
            if (result.successfully) {
                booking_status(admin, hostel);
            }
        }
        catch (error) {
            console.error("Error adding review:", error);
        }
    });
}
let booking_btn_list_map = [
    { btn: booking_btn_pending, status: "Pending" },
    { btn: booking_btn_cancel, status: "Cancel" },
];
booking_btn_list_map.forEach(bbtm => {
    bbtm.btn.addEventListener("click", function () {
        console.log("clicked");
        booking_status_change(admin_number, hostel_id, bbtm.status);
    });
});
booking_status(admin_number, hostel_id);
setInterval(() => {
    // new HostelReviews()
    // booking_status(admin_number, hostel_id)
}, 5000);
