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
