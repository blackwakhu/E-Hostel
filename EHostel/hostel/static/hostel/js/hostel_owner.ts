import { table } from "console";
import { hideSingleElements } from "./mymodules.js"

let hostel_id: number = Number(document.querySelector<HTMLSpanElement>("#hostel_id").textContent)
let bookingDiv: HTMLDivElement = document.querySelector<HTMLDivElement>("#hostelBookings")
let availRoomsTd: HTMLSpanElement = document.querySelector<HTMLSpanElement>("#avail_rooms")

let add_amenities_btn: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#add-amenities-btn")
let add_amenities_div: HTMLDivElement = document.querySelector<HTMLDivElement>("#add-amenities-div")
let new_amenity_btn: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#new-amenity-btn")
let new_amenity_div: HTMLDivElement = document.querySelector<HTMLDivElement>("#new-amenity-div")

async function fetchBookings(hostelId) {
    try {
      const response = await fetch(`/api/owner/student_bookings/${hostelId}`); // Replace with your actual URL
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data
  
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error; 
    }
  }
  

  async function displayBookings(hostelId) {
    try {
        const data = await fetchBookings(hostelId);
        const bookings = data.bookings
      availRoomsTd.textContent = `${data.vacancies}`
        if (bookingDiv) {
          bookingDiv.innerHTML = ""
            if (bookings && bookings.length > 0) {
                let tableBook = document.createElement("table")
                let titleBook = document.createElement("thead")
                titleBook.innerHTML += "<tr><th>Admission Number</th><th>Name</th><th>Email</th><th>Phone number</th><th>Booking status</th></tr>"
                tableBook.appendChild(titleBook)
                let bodyBook = document.createElement("tbody")
                bookings.forEach((booking) => {
                    let tempTr = document.createElement("tr")
                    tempTr.innerHTML = `
                        <td>${booking.student.admin}</td>
                        <td>${booking.student.first_name} ${booking.student.last_name}</td>
                        <td>${booking.student.email}</td>
                        <td>${booking.student.contact}</td>
                        <td>${booking.status}</td>
                    `
                    bodyBook.appendChild(tempTr)

                } )
                tableBook.appendChild(bodyBook)
                bookingDiv.appendChild(tableBook)
            } else {
                bookingDiv.innerHTML = "<p>No Students have booked the hostels</p>"
            }
            
        }
  
    } catch (error) {
      console.error("Error displaying bookings:", error);
      if(document.getElementById("bookings-list")){
          document.getElementById("bookings-list").innerHTML = "<p>Error loading bookings.</p>"
      }
  
    }
  }

add_amenities_btn.addEventListener("click", () => {
  hideSingleElements(add_amenities_btn, add_amenities_div)
  hideSingleElements(new_amenity_div, new_amenity_btn)
})

new_amenity_btn.addEventListener("click", () => {
  hideSingleElements(new_amenity_btn, new_amenity_div)
})

document.querySelector<HTMLButtonElement>("#submit-amenity-btn").addEventListener("click", function () {
  let amenity: string = document.querySelector<HTMLInputElement>("#amenity-input").value
  if (amenity) {
    console.log(amenity)
  } else {
    console.log("no amenity")
  }
})
  
  document.addEventListener("DOMContentLoaded", () => {
      displayBookings(hostel_id);
  });

setInterval(() => {
      displayBookings(hostel_id)
  }, 5000)