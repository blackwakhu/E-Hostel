import { Review } from "./mymodules.js";

const hostel_id = parseInt(document.getElementById('hostel-id')?.dataset.hostelId || '');
const admin_number = document.getElementById('hostel-id')?.dataset.admissionNumber || '';



class HostelReviews {
    private hostel_id: number = hostel_id
    private reviews:Review[]
    constructor() {
        this.loadReviews()
    }

    async loadReviews(): Promise<void>{
        try {
            const response = await fetch(`/student/hostel/${this.hostel_id}/`, {
                headers: { 'X-Requested-With': 'XMLHttpRequest' },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            this.reviews = data.reviews;
            this.renderReviews();

        } catch (error) {
            console.error('Error loading reviews:', error);
        }
    }
    renderReviews() {
        const reviewsContainer = document.getElementById('reviews-container');
        
        if (!reviewsContainer) return;
        
        reviewsContainer.innerHTML = '';
        
        this.reviews.forEach((review) => {
            const reviewElement = this.createReviewElement(review);
            reviewsContainer.appendChild(reviewElement);
        });
    }
        
    createReviewElement(review: Review): HTMLDivElement {
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
            const replyElement = document.createElement('div');
            replyElement.innerHTML = `<p><strong>${reply.student}</strong> (${reply.rating} stars) - ${reply.comment}</p>`;
            document.getElementById(`replies-${review.id}`)?.appendChild(replyElement);
        });
            
        return reviewElement;
    }
}

async function createReview(comment: string, rating: number, parent_id: number | null = null): Promise<void> { 
    const url = "/student/hostel/comment/create/"; // Adjust the URL to your API endpoint

    const reviewData = {
        student_id: admin_number,
        hostel_id: hostel_id,
        comment: comment,
        rating: rating,
        parent_id: parent_id
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }   

        const result = await response.json();
        console.log("Review added successfully:", result);

    } catch (error) {
        console.error("Error adding review:", error);
    }
}

document.getElementById('add-review-button')?.addEventListener("click", () => {
    const comment: string = document.querySelector<HTMLInputElement>('#review-comment').value
    const rating: number = parseInt(document.querySelector<HTMLInputElement>('#review-rating').value)   
    createReview(comment, rating)
})

new HostelReviews()

setInterval(() => {
    new HostelReviews()
}, 5000)
