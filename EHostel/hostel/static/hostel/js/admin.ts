let stud_btn: HTMLAnchorElement = document.querySelector("#stud-btn")
let owner_btn: HTMLAnchorElement = document.querySelector("#owner-btn")
let book_btn: HTMLAnchorElement = document.querySelector("#book-btn")
let hostel_btn: HTMLAnchorElement = document.querySelector("#hostel-btn")

let admin_div: HTMLDivElement = document.querySelector(".admin-div")



async function getData(url: string): Promise<any[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error status ${response.status}`)
        } const data = await response.json()
        return data.data
    } catch (error) {
        console.log(error)
    }
}



stud_btn.addEventListener("click", function () {
    admin_div.innerHTML = ""
    let title: HTMLHeadElement = document.createElement("h1")
    title.innerText = "Students List"
    admin_div.appendChild(title)

    let print_div: HTMLDivElement = document.createElement("div")
    print_div.classList.add("print-a-div")

    let print_a: HTMLAnchorElement = document.createElement("a")
    print_a.classList.add("print-a")
    print_a.innerText = "Print Students"
    print_div.appendChild(print_a)
    admin_div.appendChild(print_div)

    let stud_div: HTMLDivElement = document.createElement("div")
    let stud_table: HTMLTableElement = document.createElement("table")

    load_person(stud_table, "/myadmin/get_students/", "Admission Number")
    stud_div.appendChild(stud_table)
    admin_div.appendChild(stud_div)
})

interface Person {
    admin: string,
    fname: string,
    lname: string,
    email: string,
    contact: string
}

async function load_person(table: HTMLTableElement, url: string, title: string) {
    const data: Person[] = await getData(url)

    let trHead: HTMLTableRowElement = document.createElement("tr")
    trHead.innerHTML = `<th>${title}</th> <th>Name</th> <th>Email</th><th>Contact</th>`
    table.appendChild(trHead)

    data.forEach(datum => {
        let tr: HTMLTableRowElement = document.createElement("tr")
        tr.innerHTML = `
            <td>${datum.admin}</td>
            <td>${datum.fname} ${datum.lname}</td>
            <td>${datum.email}</td>
            <td>${datum.contact}</td>
        `
        table.appendChild(tr)
    })

}

owner_btn.addEventListener("click", function () {
    admin_div.innerHTML = ""
    let title: HTMLHeadElement = document.createElement("h1")
    title.innerText = "Landlord List"
    admin_div.appendChild(title)

    let print_div: HTMLDivElement = document.createElement("div")
    print_div.classList.add("print-a-div")

    let print_a: HTMLAnchorElement = document.createElement("a")
    print_a.classList.add("print-a")
    print_a.innerText = "Print Owners"
    print_div.appendChild(print_a)
    admin_div.appendChild(print_div)

    let owner_div: HTMLDivElement = document.createElement("div")
    let owner_table: HTMLTableElement = document.createElement("table")
    load_person(owner_table, "/myadmin/get_owners/", "UserName")
    owner_div.appendChild(owner_table)

    admin_div.appendChild(owner_div)

})

hostel_btn.addEventListener("click", function () {
    admin_div.innerHTML = ""
    let title: HTMLHeadElement = document.createElement("h1")
    title.innerText = "Hostel List"
    admin_div.appendChild(title)

    let print_div: HTMLDivElement = document.createElement("div")
    print_div.classList.add("print-a-div")

    let print_a: HTMLAnchorElement = document.createElement("a")
    print_a.classList.add("print-a")
    print_a.innerText = "Print Hostels"
    print_div.appendChild(print_a)
    admin_div.appendChild(print_div)

    let hostel_div: HTMLDivElement = document.createElement("div")
    let hostel_table: HTMLTableElement = document.createElement("table")
    load_hostel(hostel_table, "/myadmin/get_hostels/")
    hostel_div.appendChild(hostel_table)

    admin_div.appendChild(hostel_div)
})
interface Hostel {
    name: string,
    owner_fname: string,
    owner_lname: string,
    rent: number,
    locality: string,
    type: string,
    capacity: number,
    availability: number
}

async function load_hostel(table: HTMLTableElement, url: string) {
    const data: Hostel[] = await getData(url)

    let trHead: HTMLTableRowElement = document.createElement("tr")
    trHead.innerHTML = "<th>Name</th> <th>Owner Name</th> <th>Rent(ksh)</th><th>Location</th><th>Type</th><th>Capacity</th><th>Empty Rooms</th>"
    table.appendChild(trHead)

    data.forEach(datum => {
        let tr: HTMLTableRowElement = document.createElement("tr")
        tr.innerHTML = `
            <td>${datum.name}</td>
            <td>${datum.owner_fname} ${datum.owner_lname}</td>
            <td>${datum.rent}</td>
            <td>${datum.locality}</td>
            <td>${datum.type}</td>
            <td>${datum.capacity}</td>
            <td>${datum.availability}</td>
        `
        table.appendChild(tr)
    })
}


book_btn.addEventListener("click", function () {
    admin_div.innerHTML = ""


    let title: HTMLHeadElement = document.createElement("h1")
    title.innerText = "Booking List"
    admin_div.appendChild(title)

    let button_div: HTMLDivElement = document.createElement("div")
    let url: string = "/myadmin/get_bookings/all/"

    let print_div: HTMLDivElement = document.createElement("div")
    print_div.classList.add("print-a-div")

    let choice_arr: { btn: HTMLButtonElement, url: string, title: string, a_title: string, a_url: string| null }[] = [{
        btn: document.createElement("button"),
        url: "/myadmin/get_bookings/all/",
        title: "History",
        a_title: "Print All",
        a_url: null
    }, {
        btn: document.createElement("button"),
        url: "/myadmin/get_bookings/Accept/",
        title: "Accepted",
        a_title: "Print Accepted",
        a_url: null
    }, {
        btn: document.createElement("button"),
        url: "/myadmin/get_bookings/Reject/",
        title: "Rejected",
        a_title: "Print Rejected",
        a_url: null
    }, {
        btn: document.createElement("button"),
        url: "/myadmin/get_bookings/Pending/",
        title: "Pending",
        a_title: "Print Pending",
        a_url: null
    }, {
        btn: document.createElement("button"),
        url: "/myadmin/get_bookings/EndLease/",
        title: "Complete Lease",
        a_title: "Print Complete Lease",
        a_url: null
    }, {
        btn: document.createElement("button"),
        url: "/myadmin/get_bookings/Cancel/",
        title: "Cancelled",
        a_title: "Print Cancelled",
        a_url: null
    }
    ]
    let booking_div: HTMLDivElement = document.createElement("div")
    let booking_table: HTMLTableElement = document.createElement("table")
    choice_arr.forEach(choice => {
        choice.btn.innerText = choice.title
        choice.btn.classList.add("admin-booking-btns")
        choice.btn.addEventListener("click", function () {
            booking_table.innerHTML = ""
            load_booking(booking_table, choice.url)
        })
        button_div.appendChild(choice.btn)
        let a: HTMLAnchorElement = document.createElement("a")
        a.classList.add("print-a")
        a.innerText = choice.a_title
        print_div.appendChild(a)
    })

    admin_div.appendChild(button_div)
    admin_div.appendChild(print_div)

    load_booking(booking_table, url)
    booking_div.appendChild(booking_table)

    admin_div.appendChild(booking_div)
})

interface Booking {
    sfname: string,
    slname: string,
    hostel: string,
    ofname: string,
    olname: string,
    status: string,
}

async function load_booking(table: HTMLTableElement, url: string) {
    const data: Booking[] = await getData(url)

    let trHead: HTMLTableRowElement = document.createElement("tr")
    trHead.innerHTML = "<th>Student Name</th><th>Owner Name</th> <th>Hostel Name</th><th>Book Status</th>"
    table.appendChild(trHead)

    data.forEach(datum => {
        let tr: HTMLTableRowElement = document.createElement("tr")
        tr.innerHTML = `
            <td>${datum.sfname} ${datum.slname}</td>
            <td>${datum.ofname} ${datum.olname}</td>
            <td>${datum.hostel}</td>
            <td>${datum.status}</td>
        `
        table.appendChild(tr)
    })
}



