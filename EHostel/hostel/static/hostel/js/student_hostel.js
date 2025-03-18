var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a, _b;
// const admin_number: string = document.querySelector<HTMLSpanElement>("#stud_admin").textContent
// const hostel_id: number = Number(document.querySelector<HTMLSpanElement>("#hostel_id").textContent)
const hostel_id = parseInt(((_a = document.getElementById('hostel-id')) === null || _a === void 0 ? void 0 : _a.dataset.hostelId) || '');
const admin_number = parseInt(((_b = document.getElementById('hostel-id')) === null || _b === void 0 ? void 0 : _b.dataset.admissionNumber) || '');
class HostelReview {
    constructor(hostelId, studentId) {
        this.hostelId = hostelId;
        this.studentId = studentId;
        this.loadReviews();
        this.setEventListeners();
    }
    loadReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield fetch(`/student/hostel/${this.hostelId}/`, {
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
    addReview(comment_1, rating_1) {
        return __awaiter(this, arguments, void 0, function* (comment, rating, parentReviewId = null) {
            const response = yield fetch(`/api/student/hostel/review/add/${this.hostelId}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `student_id=${this.studentId}&comment=${comment}&rating=${rating}&parent_review_id=${parentReviewId || ''}`
            });
            const data = yield response.json();
            if (data.success) {
                this.loadReviews();
            }
        });
    }
    setEventListeners() {
        var _a;
        (_a = document.getElementById('add-review-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            const comment = document.querySelector('#review-comment').value;
            const rating = parseInt(document.querySelector('#review-rating').value);
            this.addReview(comment, rating);
        });
    }
}
new HostelReview(hostel_id, admin_number);
export {};
// async function displayReviews(hostelId: number) {
//     const reviews = ""
// }
// async function fetchReviews(hostelId: number): Promise<Review[]>{
//     try {
//         const response = await fetch(`${url}/student/hostel/${hostelId}/`, {
//             headers: {
//                 'X-Requested-With': 'XMLHttpRequest',
//             },
//         })
//         if (!response.ok) {
//             throw new Error(`Http error status: ${response.status}`)
//         }
//         const data = await response.json()
//         if (data && data.reviews && Array.isArray(data.reviews)) {
//             return data.reviews 
//         } else {
//             console.error('Invalid review data format:', data)
//         }
//     } catch (error) {
//         console.error('Error fetching hostel reviews:', error)
//     }
// }
// Example usage:
