import { hideSingleElements, alterAmenity } from "./mymodules.js"

let hostel_id: number = Number(document.querySelector<HTMLSpanElement>("#hostel_id").textContent)
let bookingDiv: HTMLDivElement = document.querySelector<HTMLDivElement>("#hostelBookings")
let availRoomsTd: HTMLSpanElement = document.querySelector<HTMLSpanElement>("#avail_rooms")

let add_amenities_btn: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#add-amenities-btn")
let add_amenities_div: HTMLDivElement = document.querySelector<HTMLDivElement>("#add-amenities-div")
let new_amenity_btn: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#new-amenity-btn")
let new_amenity_div: HTMLDivElement = document.querySelector<HTMLDivElement>("#new-amenity-div")
let close_amenity_btn: HTMLButtonElement = document.querySelector<HTMLButtonElement>("#close-amenity-btn")
let amenity_display_div: HTMLDivElement = document.querySelector<HTMLDivElement>(".amenities-display")
let amenity_global_div: HTMLDivElement = document.querySelector<HTMLDivElement>(".amenities-global")

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

close_amenity_btn.addEventListener("click", function () {
  hideSingleElements(new_amenity_div, new_amenity_btn)
  hideSingleElements(add_amenities_div, add_amenities_btn)
})



interface myAmenity {
  amenity: string
}

class Amenities {
  private hostel_id: number = hostel_id
  private amenities: myAmenity[]
  private gamenities: myAmenity[]
  constructor() {
    this.loadAmenity()
  }
  async loadAmenity(): Promise<void> {
    try {
      const response = await fetch(`/owner/hostel/${this.hostel_id}/`, {
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      this.amenities = data.amenities
      this.gamenities = data.gamenities
      this.renderAmenities()
    } catch (error) {
      console.error("Error loading amenities: ", error)
    }
  } 
  renderAmenities() {
    amenity_display_div.innerHTML = ""
    if (this.amenities.length > 0) {
      let p: HTMLParagraphElement = document.createElement("p")
      this.amenities.forEach(amenity => {
        let span: HTMLSpanElement = document.createElement("span")
        span.innerHTML = `${amenity.amenity}`
        let del_btn: HTMLButtonElement = document.createElement("button")
        del_btn.innerText = "X"
        del_btn.addEventListener("click", function () {
          let myurl1 = `/owner/hostel/${hostel_id}/remove_amenity/${amenity.amenity}/`
          alterAmenity(myurl1)
        })
        span.appendChild(del_btn)
        p.appendChild(span)
      })
      amenity_display_div.appendChild(p)
    } else {
      amenity_display_div.innerHTML = "<p>There are no amenities attached to this hostel</p>"
    }
    amenity_global_div.innerHTML = ""
    if (this.gamenities.length > 0) {
      let p1: HTMLParagraphElement = document.createElement("p")
      this.gamenities.forEach(amenity => {
        let btn: HTMLButtonElement = document.createElement("button")
        btn.innerText = amenity.amenity
        btn.classList.add('amenity-item-btn')
        btn.addEventListener("click", function () {
          let myurl:string = `/owner/hostel/${hostel_id}/add_amenity/${amenity.amenity}/`
          alterAmenity(myurl)
        })
        p1.appendChild(btn)
      })
      amenity_global_div.appendChild(p1)
    } else {
      amenity_global_div.innerHTML = "<p>No Amenities available. Please add more</p>"
    }
    this.loadAmenity()
  }
  async createAmenity(amenity: string): Promise<void> {
    try {
      const response = await fetch(`/api/owner/hostel/amenities/${this.hostel_id}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({"amenity": amenity})
      })
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()

      if (data.success) {
        this.loadAmenity()
      }
    } catch (error) {
      console.error("Error adding a new amenity", error)
    }
  }
  
}

const myAmenity = new Amenities()

document.querySelector<HTMLButtonElement>("#submit-amenity-btn").addEventListener("click", function () {
  let amenity: string = document.querySelector<HTMLInputElement>("#amenity-input").value
  if (amenity) {
    console.log(amenity)
    myAmenity.createAmenity(amenity)
    hideSingleElements(new_amenity_div, new_amenity_btn)
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