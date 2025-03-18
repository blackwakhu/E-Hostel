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
// const admin_number: string = document.querySelector<HTMLSpanElement>("#stud_admin").textContent
// const hostel_id: number = Number(document.querySelector<HTMLSpanElement>("#hostel_id").textContent)
const hostel_id = parseInt(((_a = document.getElementById('hostel-id')) === null || _a === void 0 ? void 0 : _a.dataset.hostelId) || '');
const admin_number = parseInt(((_b = document.getElementById('hostel-id')) === null || _b === void 0 ? void 0 : _b.dataset.admissionNumber) || '');
class HostelReviews {
    constructor() {
        this.hostelId = hostel_id;
        this.loadReviews();
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
}
new HostelReviews();
function addReview(comment_1, rating_1) {
    return __awaiter(this, arguments, void 0, function* (comment, rating, parent_id = null) {
        const loadData = {
            "student_id": admin_number,
            "hostel_id": hostel_id,
            "rating": rating,
            "comment": comment,
            "parent_id": parent_id,
        };
        try {
            const response = yield fetch("/student/hostel/comment/create/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loadData)
            });
            if (!response.ok) {
                const errorMsg = yield response.json();
                throw new Error(errorMsg.message || 'Network response was not ok');
            }
            const data = yield response.json();
            if (data.success) {
                new HostelReviews();
            }
        }
        catch (error) {
            console.error("There was an error when creating a review:", error);
            throw error;
        }
    });
}
(_c = document.getElementById('add-review-button')) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    const comment = document.querySelector('#review-comment').value;
    const rating = parseInt(document.querySelector('#review-rating').value);
    addReview(comment, rating);
});
setInterval(() => {
    new HostelReviews();
}, 5000);
export {};
// function displayReviews() { }
// function fetchComments () {}
// function createComment(comment: string, rating: number | 0, parent_review_id: string | null = null) {
//     const reviewData = {
//         student_id: admin_number, // Replace with your input IDs
//         hostel_id: hostel_id,
//         comment: comment,
//         rating: rating,
//         parent_review_id: parent_review_id,
//     }
//     let myurl = `/api/student/hostel/comment/create/`
//     console.log(myurl)
//     fetch(myurl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(reviewData),
//     }).then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Review created:', data);
//       // updateReviews(hostel_id); // Trigger the review update
//       new HostelReview(hostel_id, admin_number)
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// }
// // const hostelId = parseInt(document.getElementById('hostel-id')?.dataset.hostelId || '');
// // document.addEventListener("DOMContentLoaded", () => {
// //     updateReviews(hostel_id)
// // })
// // document.querySelector<HTMLButtonElement>("#comment-sub-0").addEventListener("click", () => {
// //     const comment: string = document.querySelector<HTMLInputElement>("#comment-inp-0").value
// //     const rating: number = 3
// //     createComment(comment, rating, null)
// // })
// // setInterval(() => {
// //     updateReviews(hostel_id)
// // }, 10000)
// document.getElementById('add-review-button')?.addEventListener('click', () => {
//   const comment: string = document.querySelector<HTMLInputElement>('#review-comment').value
//   const rating: number = parseInt(document.querySelector<HTMLInputElement>('#review-rating').value)
//   createComment(comment, rating)
// })
// interface ReviewReply {
//     id: number;
//     student: string;
//     comment: string;
//     rating: number;
//     created_at: string;
// }
//       createComment(comment: string, rating: number | 0, parent_review_id: string | null = null) {
//         const reviewData = {
//             student_id: admin_number, // Replace with your input IDs
//             hostel_id: hostel_id,
//             comment: comment,
//             rating: rating,
//             parent_review_id: parent_review_id,
//         }
//         let myurl = `/api/student/hostel/comment/create/`
//         console.log(myurl)
//         fetch(myurl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(reviewData),
//         }).then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             console.log('Review created:', data);
//             this.loadReviews() // Trigger the review update
//         })
//         .catch(error => {
//             console.error('Error:', error);
//         });
//     }
//     async addReview(comment: string, rating: number, parentReviewId: number | null = null): Promise<void>{
//         const response = await fetch(`/api/student/hostel/comment/create/`, {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 hostel_id: this.hostelId,
//                 student_id: this.studentId,
//                 comment: comment,
//                 rating: rating,
//                 parent_review_id: parentReviewId
//             })
//         })
//         const data = await response.json()
//         if (data.success) {
//             this.loadReviews();
//         }
//     }
//     setEventListeners() {
//         // document.getElementById('add-review-button')?.addEventListener('click', () => {
//         //     const comment: string = document.querySelector<HTMLInputElement>('#review-comment').value
//         //     const rating: number = parseInt(document.querySelector<HTMLInputElement>('#review-rating').value)
//         //     this.createComment(comment, rating)
//         // })
//     }
// }
// new HostelReview(hostel_id, admin_number)
// // async function displayReviews(hostelId: number) {
// //     const reviews = ""
// // }
// // async function fetchReviews(hostelId: number): Promise<Review[]>{
// //     try {
// //         const response = await fetch(`${url}/student/hostel/${hostelId}/`, {
// //             headers: {
// //                 'X-Requested-With': 'XMLHttpRequest',
// //             },
// //         })
// //         if (!response.ok) {
// //             throw new Error(`Http error status: ${response.status}`)
// //         }
// //         const data = await response.json()
// //         if (data && data.reviews && Array.isArray(data.reviews)) {
// //             return data.reviews 
// //         } else {
// //             console.error('Invalid review data format:', data)
// //         }
// //     } catch (error) {
// //         console.error('Error fetching hostel reviews:', error)
// //     }
// // }
//   // Example usage:
