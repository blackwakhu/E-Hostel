var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { url, updateReviews } from "./mymodules.js";
const admin_number = document.querySelector("#stud_admin").textContent;
const hostel_id = Number(document.querySelector("#hostel_id").textContent);
function createComment(comment, rating, parent_review_id) {
    const reviewData = {
        student_id: admin_number, // Replace with your input IDs
        hostel_id: hostel_id,
        comment: comment,
        rating: rating,
        parent_review_id: parent_review_id,
    };
    let myurl = `${url}/api/student/hostel/comment/create/`;
    console.log(myurl);
    fetch(myurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
    }).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
        .then(data => {
        console.log('Review created:', data);
        updateReviews(hostel_id); // Trigger the review update
    })
        .catch(error => {
        console.error('Error:', error);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    updateReviews(hostel_id);
});
document.querySelector("#comment-sub-0").addEventListener("click", () => {
    const comment = document.querySelector("#comment-inp-0").value;
    const rating = 3;
    createComment(comment, rating, null);
});
setInterval(() => {
    updateReviews(hostel_id);
}, 10000);
class HostelDetail {
    constructor(hostelId) {
        this.reviews = [];
        this.hostelId = hostelId;
        this.loadReviews();
        this.setupEventListeners();
    }
    loadReviews() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${url}/student/hostel/${this.hostelId}/`, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            });
            const data = yield response.json();
            this.reviews = data.reviews;
            this.renderReviews();
        });
    }
    addReview(comment_1, rating_1) {
        return __awaiter(this, arguments, void 0, function* (comment, rating, parentReviewId = null) {
            const studentId = 1; // Replace with actual student ID from the user
            const response = yield fetch(`${url}/api/student/hostel/review/${this.hostelId}/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `student_id=${studentId}&comment=${comment}&rating=${rating}&parent_review_id=${parentReviewId || ''}`,
            });
            const data = yield response.json();
            if (data.success) {
                this.loadReviews(); // Reload reviews after adding
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
    setupEventListeners() {
        var _a;
        (_a = document.getElementById('add-review-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            const comment = document.getElementById('review-comment').value;
            const rating = parseInt(document.getElementById('review-rating').value);
            this.addReview(comment, rating);
        });
        document.addEventListener('click', (event) => {
            if (event.target.classList.contains('reply-button')) {
                const reviewId = parseInt(event.target.dataset.reviewId || '');
                const replyForm = document.getElementById(`reply-form-${reviewId}`);
                if (replyForm) {
                    replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
                }
            }
            if (event.target.classList.contains('submit-reply')) {
                const reviewId = parseInt(event.target.dataset.reviewId || '');
                const comment = document.getElementById(`reply-comment-${reviewId}`).value;
                const rating = parseInt(document.getElementById(`reply-rating-${reviewId}`).value);
                this.addReview(comment, rating, reviewId);
            }
        });
    }
}
// Example usage:
const hostelId = parseInt(((_a = document.getElementById('hostel-id')) === null || _a === void 0 ? void 0 : _a.dataset.hostelId) || '');
if (hostelId) {
    new HostelDetail(hostelId);
}
