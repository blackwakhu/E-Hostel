import { url, updateReviews } from "./mymodules.js";

const admin_number: string = document.querySelector<HTMLSpanElement>("#stud_admin").textContent
const hostel_id: number = Number(document.querySelector<HTMLSpanElement>("#hostel_id").textContent)

function createComment(comment: string, rating: number | 0, parent_review_id: string | null) {
    const reviewData = {
        student_id: admin_number, // Replace with your input IDs
        hostel_id: hostel_id,
        comment: comment,
        rating: rating,
        parent_review_id: parent_review_id,
    }
    let myurl = `${url}/api/student/hostel/comment/create/`
    console.log(myurl)
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
    updateReviews(hostel_id)
})

document.querySelector<HTMLButtonElement>("#comment-sub-0").addEventListener("click", () => {
    const comment: string = document.querySelector<HTMLInputElement>("#comment-inp-0").value
    const rating: number = 3
    createComment(comment, rating, null)
})

setInterval(() => {
    updateReviews(hostel_id)
}, 10000)



interface Review {
    id: number;
    student: string;
    comment: string;
    rating: number;
    created_at: string;
    replies: Review[];
  }
  
  class HostelDetail {
    private hostelId: number;
    private reviews: Review[] = [];
  
    constructor(hostelId: number) {
      this.hostelId = hostelId;
      this.loadReviews();
      this.setupEventListeners();
    }
  
    async loadReviews(): Promise<void> {
      const response = await fetch(`${url}/student/hostel/${this.hostelId}/`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      });
      const data = await response.json();
      this.reviews = data.reviews;
      this.renderReviews();
    }
  
    async addReview(comment: string, rating: number, parentReviewId: number | null = null): Promise<void> {
      const studentId = 1; // Replace with actual student ID from the user
      const response = await fetch(`${url}/api/student/hostel/review/${this.hostelId}/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `student_id=${studentId}&comment=${comment}&rating=${rating}&parent_review_id=${parentReviewId || ''}`,
      });
      const data = await response.json();
      if (data.success) {
        this.loadReviews(); // Reload reviews after adding
      }
    }
  
    renderReviews(): void {
      const reviewsContainer = document.getElementById('reviews-container');
      if (!reviewsContainer) return;
      reviewsContainer.innerHTML = '';
  
      this.reviews.forEach((review) => {
        const reviewElement = this.createReviewElement(review);
        reviewsContainer.appendChild(reviewElement);
      });
    }
  
    createReviewElement(review: Review): HTMLElement {
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
  
    setupEventListeners(): void {
      document.getElementById('add-review-button')?.addEventListener('click', () => {
        const comment = (document.getElementById('review-comment') as HTMLInputElement).value;
        const rating = parseInt((document.getElementById('review-rating') as HTMLInputElement).value);
        this.addReview(comment, rating);
      });
  
      document.addEventListener('click', (event) => {
        if ((event.target as HTMLElement).classList.contains('reply-button')) {
          const reviewId = parseInt((event.target as HTMLElement).dataset.reviewId || '');
          const replyForm = document.getElementById(`reply-form-${reviewId}`);
          if (replyForm) {
            replyForm.style.display = replyForm.style.display === 'none' ? 'block' : 'none';
          }
        }
  
        if ((event.target as HTMLElement).classList.contains('submit-reply')) {
            const reviewId = parseInt((event.target as HTMLElement).dataset.reviewId || '');
            const comment = (document.getElementById(`reply-comment-${reviewId}`) as HTMLInputElement).value;
            const rating = parseInt((document.getElementById(`reply-rating-${reviewId}`) as HTMLInputElement).value);
            this.addReview(comment, rating, reviewId);
        }
      });
    }
  }
  // Example usage:
  const hostelId = parseInt(document.getElementById('hostel-id')?.dataset.hostelId || '');
  if(hostelId){
      new HostelDetail(hostelId);
  }

  