let hostel_id: number = Number(document.querySelector<HTMLSpanElement>("#hostel_id").textContent)

async function fetchBookings(hostelId) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/owner/student_bookings/${hostelId}`); // Replace with your actual URL
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data.bookings; // Return the bookings array
  
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error; // Rethrow the error to be handled by the caller
    }
  }
  
  // Example usage:
  async function displayBookings(hostelId) {
    try {
        const bookings = await fetchBookings(hostelId);
        console.log(bookings)
        console.log(hostel_id)
  
      // Assuming you have a div with id="bookings-list" to display the bookings
    //   const bookingsListDiv = document.getElementById("bookings-list");
  
    //   if (bookingsListDiv) {
    //     bookingsListDiv.innerHTML = ""; // Clear previous content
  
    //     if (bookings && bookings.length > 0) {
    //       bookings.forEach((booking) => {
    //         const bookingItem = document.createElement("div");
    //         bookingItem.innerHTML = `
    //           <p>Booking ID: ${booking.id}</p>
    //           <p>Status: ${booking.status}</p>
    //           <p>Student: ${booking.student}</p>
    //           <hr>
    //         `;
    //         bookingsListDiv.appendChild(bookingItem);
    //       });
    //     } else {
    //       bookingsListDiv.innerHTML = "<p>No bookings found.</p>";
    //     }
    //   } else {
    //     console.error("bookings-list div not found");
    //   }
  
    } catch (error) {
      // Handle errors from fetchBookings()
      console.error("Error displaying bookings:", error);
      if(document.getElementById("bookings-list")){
          document.getElementById("bookings-list").innerHTML = "<p>Error loading bookings.</p>"
      }
  
    }
  }
  
  // Example: Call displayBookings with a hostel ID (e.g., 4)
  document.addEventListener("DOMContentLoaded", () => {
      displayBookings(4); // Replace 4 with the desired hostel ID.
  });