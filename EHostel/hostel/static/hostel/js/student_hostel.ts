import { url, updateReviews } from "./mymodules.js";

const admin_number: string = document.querySelector<HTMLSpanElement>("#stud_admin").textContent
const hostel_id: number = Number(document.querySelector<HTMLSpanElement>("#hostel_id").textContent)
const hostel_page: HTMLDivElement = document.querySelector<HTMLDivElement>(".hostel_page")

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

interface Hostel {
    id: number;
    hostel_name: string;
    price_per_month: number;
    location: string;
    number_rooms: number;
    room_type: string;
    available_rooms: number;
    county: string;
    town: string;
    locality: string;
    // Add other relevant fields
  }
  
  interface HostelResponse {
    hostels: Hostel[];
    page: number;
    num_pages: number;
    has_previous: boolean;
    has_next: boolean;
    previous_page_number: number | null;
    next_page_number: number | null;
  }
  
  class HostelList {
    private currentPage: number = 1;
    private hostels: Hostel[] = [];
    private numPages: number = 0;
  
    async fetchHostels(page: number = 1): Promise<void> {
      const response = await fetch(`/api/hostels/?page=${page}`); // Replace with your actual URL
      const data: HostelResponse = await response.json();
  
      this.hostels = data.hostels;
      this.currentPage = data.page;
      this.numPages = data.num_pages;
  
      this.updateUI();
    }
  
    nextPage(): void {
      if (this.currentPage < this.numPages) {
        this.fetchHostels(this.currentPage + 1);
      }
    }
  
    previousPage(): void {
      if (this.currentPage > 1) {
        this.fetchHostels(this.currentPage - 1);
      }
    }
  
    updateUI(): void {
      const hostelListElement = document.getElementById('hostel-list');
      if (hostelListElement) {
          hostelListElement.innerHTML = ''; // Clear previous list
          this.hostels.forEach(hostel => {
              const hostelItem = document.createElement('li');
              hostelItem.textContent = hostel.hostel_name;
              hostelListElement.appendChild(hostelItem);
          });
      }
  
      const prevButton: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#prev-button');
      const nextButton: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#next-button');
  
      if(prevButton){
          prevButton.disabled = !(this.currentPage > 1);
      }
      if(nextButton){
          nextButton.disabled = !(this.currentPage < this.numPages);
      }
    }
  
    constructor() {
      this.fetchHostels();
      const prevButton: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#prev-button');
      const nextButton: HTMLButtonElement = document.querySelector<HTMLButtonElement>('#next-button');
      if(prevButton){
          prevButton.addEventListener('click', () => this.previousPage());
      }
      if(nextButton){
          nextButton.addEventListener('click', () => this.nextPage());
      }
    }
  }
  
  new HostelList();
  