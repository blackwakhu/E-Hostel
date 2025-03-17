var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { url, updateReviews } from "./mymodules.js";
const admin_number = document.querySelector("#stud_admin").textContent;
const hostel_id = Number(document.querySelector("#hostel_id").textContent);
const hostel_page = document.querySelector(".hostel_page");
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
class HostelList {
    fetchHostels() {
        return __awaiter(this, arguments, void 0, function* (page = 1) {
            const response = yield fetch(`/api/hostels/?page=${page}`); // Replace with your actual URL
            const data = yield response.json();
            this.hostels = data.hostels;
            this.currentPage = data.page;
            this.numPages = data.num_pages;
            this.updateUI();
        });
    }
    nextPage() {
        if (this.currentPage < this.numPages) {
            this.fetchHostels(this.currentPage + 1);
        }
    }
    previousPage() {
        if (this.currentPage > 1) {
            this.fetchHostels(this.currentPage - 1);
        }
    }
    updateUI() {
        const hostelListElement = document.getElementById('hostel-list');
        if (hostelListElement) {
            hostelListElement.innerHTML = ''; // Clear previous list
            this.hostels.forEach(hostel => {
                const hostelItem = document.createElement('li');
                hostelItem.textContent = hostel.hostel_name;
                hostelListElement.appendChild(hostelItem);
            });
        }
        const prevButton = document.querySelector('#prev-button');
        const nextButton = document.querySelector('#next-button');
        if (prevButton) {
            prevButton.disabled = !(this.currentPage > 1);
        }
        if (nextButton) {
            nextButton.disabled = !(this.currentPage < this.numPages);
        }
    }
    constructor() {
        this.currentPage = 1;
        this.hostels = [];
        this.numPages = 0;
        this.fetchHostels();
        const prevButton = document.querySelector('#prev-button');
        const nextButton = document.querySelector('#next-button');
        if (prevButton) {
            prevButton.addEventListener('click', () => this.previousPage());
        }
        if (nextButton) {
            nextButton.addEventListener('click', () => this.nextPage());
        }
    }
}
new HostelList();
