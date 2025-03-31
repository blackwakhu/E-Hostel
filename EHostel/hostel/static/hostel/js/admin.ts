let stud_btn: HTMLAnchorElement = document.querySelector("#stud-btn");
let owner_btn: HTMLAnchorElement = document.querySelector("#owner-btn");
let book_btn: HTMLAnchorElement = document.querySelector("#book-btn");
let hostel_btn: HTMLAnchorElement = document.querySelector("#hostel-btn");
let admin_title: HTMLHeadElement = document.querySelector("#admin-title");

let admin_div: HTMLDivElement = document.querySelector(".admin-div");

async function getData(url: string): Promise<any[]> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error status ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.log(error);
    }
}

stud_btn.addEventListener("click", function () {
    active_thing();
});

async function active_thing() {
    admin_title.innerText = "Student Registry Report";
    admin_div.innerHTML = "";

    let print_div: HTMLDivElement = document.createElement("div");
    let searchInput: HTMLInputElement = document.createElement("input");
    searchInput.placeholder = "Enter the Name or Admission Number";
    searchInput.classList.add("admin-search-input");
    print_div.appendChild(searchInput);

    let searchBtn: HTMLButtonElement = document.createElement("button");
    searchBtn.innerHTML = "<img src='/static/admin/img/search.svg' alt='Search'>";
    print_div.appendChild(searchBtn);
    searchBtn.classList.add("admin-search-btn");

    let stud_div: HTMLDivElement = document.createElement("div");
    let stud_table: HTMLTableElement = document.createElement("table");
    searchBtn.addEventListener("click", async function () {
        let data: Person[] = await getData("/myadmin/get_students/");
        let searchTerm: string = searchInput.value.toLocaleLowerCase();
        let mydata: Person[] = data.filter((student) => {
            return (
                student.fname.toLowerCase().includes(searchTerm) ||
                student.lname.toLowerCase().includes(searchTerm) ||
                student.admin.toLocaleLowerCase().includes(searchTerm)
            );
        });
        stud_table.innerHTML = "";
        load_person(stud_table, "Admission Number", mydata);
    });

    print_div.classList.add("print-a-div");

    let print_a: HTMLAnchorElement = document.createElement("a");
    print_a.classList.add("print-a");
    print_a.innerText = "Convert To PDF";
    print_a.href = "/myadmin/get_students/download/";
    print_div.appendChild(print_a);

    let print_a_query: HTMLButtonElement = document.createElement("button")
    print_a_query.innerText = "Conver Query Results To PDF"
    print_a_query.addEventListener("click", function () {
        let url: string = "/myadmin/get_students/download/"
        const searchTerm = searchInput.value
        if (searchTerm) {
            url += `${searchTerm}/`
        }
        window.location.href = url
    })
    print_div.appendChild(print_a_query)

    admin_div.appendChild(print_div);

    let data: Person[] = await getData("/myadmin/get_students/");

    load_person(stud_table, "Admission Number", data);
    stud_div.appendChild(stud_table);
    admin_div.appendChild(stud_div);
}

active_thing();

interface Person {
    admin: string;
    fname: string;
    lname: string;
    email: string;
    contact: string;
}

function load_person(table: HTMLTableElement, title: string, data: Person[]) {
    let trHead: HTMLTableRowElement = document.createElement("tr");
    trHead.innerHTML = `<th>${title}</th> <th>Name</th> <th>Email</th><th>Contact</th>`;
    table.appendChild(trHead);

    data.forEach((datum) => {
        let tr: HTMLTableRowElement = document.createElement("tr");
        tr.innerHTML = `
            <td>${datum.admin}</td>
            <td>${datum.fname} ${datum.lname}</td>
            <td>${datum.email}</td>
            <td>${datum.contact}</td>
        `;
        table.appendChild(tr);
    });
}

function load_owner(table: HTMLTableElement, data: Person[]) {
    let trHead: HTMLTableRowElement = document.createElement("tr");
    trHead.innerHTML = `<th>Name</th> <th>Email</th><th>Contact</th>`;
    table.appendChild(trHead);

    data.forEach((datum) => {
        let tr: HTMLTableRowElement = document.createElement("tr");
        tr.innerHTML = `
            <td>${datum.fname} ${datum.lname}</td>
            <td>${datum.email}</td>
            <td>${datum.contact}</td>
        `;
        table.appendChild(tr);
    });
}

owner_btn.addEventListener("click", async function () {
    admin_title.innerText = "LandLord Registry Report";
    admin_div.innerHTML = "";

    let print_div: HTMLDivElement = document.createElement("div");
    print_div.classList.add("print-a-div");

    let print_a: HTMLAnchorElement = document.createElement("a");
    print_a.classList.add("print-a");
    let input_search: HTMLInputElement = document.createElement("input")
    input_search.placeholder = "Enter Name"
    print_div.appendChild(input_search)

    let input_button: HTMLButtonElement = document.createElement("button")
    input_button.innerHTML = "<img src='/static/admin/img/search.svg' alt='Search'>";
    let owner_table: HTMLTableElement = document.createElement("table");
    input_button.addEventListener("click", async function () {
        let data: Person[] = await getData("/myadmin/get_owners/")
        let searchTerm: string = input_search.value.toLowerCase()
        let mydata: Person[] = data.filter((owner) => {
            return (
                owner.fname.toLowerCase().includes(searchTerm) ||
                owner.lname.toLowerCase().includes(searchTerm)
            )
        })
        owner_table.innerHTML = ""
        load_owner(owner_table, mydata)
    })
    print_div.appendChild(input_button)

    print_a.innerText = "Convert To PDF";
    print_a.href = "/myadmin/get_owners/download/";
    print_div.appendChild(print_a);

    let print_a_query: HTMLButtonElement = document.createElement("button")
    print_a_query.innerText = "Convert Query To PDF"
    print_a_query.addEventListener("click", function () {
        let url: string = '/myadmin/get_owners/download/'
        const searchTerm = input_search.value
        if (searchTerm) {
            url += `${searchTerm}`
        }
        window.location.href = url
    })
    print_div.appendChild(print_a_query)
    admin_div.appendChild(print_div);

    let owner_div: HTMLDivElement = document.createElement("div");
    let data:Person[] = await getData("/myadmin/get_owners/")
    load_owner(owner_table, data);
    

    owner_div.appendChild(owner_table);

    admin_div.appendChild(owner_div);
});

hostel_btn.addEventListener("click", async function () {
    admin_title.innerText = "Hostel Registry Report";
    admin_div.innerHTML = "";
    

    let print_div: HTMLDivElement = document.createElement("div");
    print_div.classList.add("print-a-div");

    let search_input: HTMLInputElement = document.createElement("input")

    search_input.placeholder = "Enter Hostel Name or Location"
    
    let search_button: HTMLButtonElement = document.createElement("button")
    search_button.innerHTML = "<img src='/static/admin/img/search.svg' alt='Search'>";
    print_div.appendChild(search_input)
    let search_min_rent: HTMLInputElement = document.createElement("input")
    search_min_rent.type = "number"
    search_min_rent.placeholder = "Enter the min rent"
    print_div.appendChild(search_min_rent)
    let search_max_rent: HTMLInputElement = document.createElement("input")
    search_max_rent.type = "number"
    search_max_rent.placeholder = "Enter the max rent"
    print_div.appendChild(search_max_rent)
    let options: string[] = ["All", "Single", "Double", "Triple", "Quad", "Bed Seater", "Self Contained"]
    let select_search: HTMLSelectElement = document.createElement("select")
    add_select(select_search, options, "All")
    print_div.appendChild(select_search)

    let hostel_table: HTMLTableElement = document.createElement("table");

    search_button.addEventListener("click", async function () {
        let search_term_inp = search_input.value.toLowerCase()
        let min_rent: number = parseFloat(search_min_rent.value) || 0
        let max_rent: number = parseFloat(search_max_rent.value) || Infinity
        const data: Hostel[] = await getData("/myadmin/get_hostels/")
        let mydata: Hostel[] = data.filter((hostel) => {
            const priceRange = hostel.rent <= max_rent && hostel.rent >= min_rent
            const room_type = select_search.value === "All" || hostel.type === select_search.value
            return (
                (hostel.name.toLowerCase().includes(search_term_inp) || 
                    hostel.locality.toLocaleLowerCase().includes(search_term_inp))
                && priceRange 
                && room_type
            )
        })
        hostel_table.innerHTML = ""
        load_hostel(hostel_table, mydata)
    })
    print_div.appendChild(search_button)

    let print_a: HTMLAnchorElement = document.createElement("a");
    print_a.classList.add("print-a");
    print_a.innerText = "Convert to PDF";
    print_a.href = "/myadmin/get_hostels/download/";
    print_div.appendChild(print_a);
    let print_a_query: HTMLButtonElement = document.createElement("button")
    print_a_query.innerText = "Convert Query To PDF"
    print_a_query.addEventListener("click", function () {
        let url: string = "/myadmin/get_hostels/download/"
        const searchTerm = search_input.value
        const max_price = parseInt(search_max_rent.value) || 0
        const min_price = parseInt(search_min_rent.value) || 20000
        const type_term = select_search.value
        if (searchTerm || max_price || min_price || type_term) {
            url += `${searchTerm || "null"}/${max_price}/${min_price}/${type_term}/`
        }
        window.location.href = url
    })
    print_div.appendChild(print_a_query)
    admin_div.appendChild(print_div);

    let hostel_div: HTMLDivElement = document.createElement("div");
    const data: Hostel[] = await getData("/myadmin/get_hostels/")
    load_hostel(hostel_table, data);
    hostel_div.appendChild(hostel_table);

    admin_div.appendChild(hostel_div);
});
interface Hostel {
    name: string;
    owner_fname: string;
    owner_lname: string;
    rent: number;
    locality: string;
    type: string;
    capacity: number;
    availability: number;
}

function add_select(select: HTMLSelectElement, options: string[], selval?: string) {
    options.forEach((option) => {
        let optionelem = document.createElement("option")
        optionelem.textContent = option
        optionelem.value = option
        if (selval && selval === option) {
            optionelem.selected = true
        }
        select.appendChild(optionelem)
    })
}

function load_hostel(table: HTMLTableElement, data: Hostel[]) {

    let trHead: HTMLTableRowElement = document.createElement("tr");
    trHead.innerHTML =
        "<th>Name</th> <th>Owner Name</th> <th>Rent(ksh)</th><th>Location</th><th>Type</th><th>Capacity</th><th>Empty Rooms</th>";
    table.appendChild(trHead);

    data.forEach((datum) => {
        let tr: HTMLTableRowElement = document.createElement("tr");
        tr.innerHTML = `
            <td>${datum.name}</td>
            <td>${datum.owner_fname} ${datum.owner_lname}</td>
            <td>${datum.rent}</td>
            <td>${datum.locality}</td>
            <td>${datum.type}</td>
            <td>${datum.capacity}</td>
            <td>${datum.availability}</td>
        `;
        table.appendChild(tr);
    });
}

book_btn.addEventListener("click", async function () {
    admin_title.innerText = "Booking Registry Report";
    admin_div.innerHTML = "";

    let print_div: HTMLDivElement = document.createElement("div")
    print_div.classList.add("print-a-div")

    let input_search: HTMLInputElement = document.createElement("input")
    input_search.placeholder = "Enter hostel name or student name"
    print_div.appendChild(input_search)

    let start_button: HTMLInputElement = document.createElement("input")
    start_button.type = "date"
    function getDateTenYearsAgo(): string {
        const currentDate = new Date();
        const tenYearsAgo = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
        return tenYearsAgo.toISOString().split('T')[0];
      }
      
    start_button.value = getDateTenYearsAgo();
    print_div.appendChild(start_button)
    let stop_button: HTMLInputElement = document.createElement("input")
    stop_button.type = "date"
    stop_button.value = new Date().toISOString().split('T')[0];
    print_div.appendChild(stop_button)
    let input_status = document.createElement("input")
    print_div.appendChild(input_status)
    let input_button: HTMLButtonElement = document.createElement("button")
    input_button.innerHTML = "<img src='/static/admin/img/search.svg' alt='Search'>";

    let booking_table: HTMLTableElement = document.createElement("table")
    print_div.appendChild(input_button)
    let print_a: HTMLAnchorElement = document.createElement("a")
    print_a.innerText = "Convert To PDF"
    print_a.classList.add("print-a")
    print_a.href = "/myadmin/get_bookings/download/"
    print_div.appendChild(print_a)

    let print_a_query: HTMLButtonElement = document.createElement("button")
    print_a_query.innerText = "Convert Query To PDF"
    print_a_query.addEventListener("click", function () {
        let url: string = "/myadmin/get_bookings/download/"
        let start = start_button.value
        let stop = stop_button.value
        let search_term = input_search.value
        let status = input_status.value
        if (search_term || start || stop || status) {
            url += `${search_term || "null"}/${start}/${stop}/${status}/`
        }
        window.location.href = url
    })
    print_div.appendChild(print_a_query)

    admin_div.appendChild(print_div)
    const data: Booking[] = await getData("/myadmin/get_bookings/")
    load_booking(booking_table, data)
    let booking_div: HTMLDivElement = document.createElement("div")
    booking_div.appendChild(booking_table)

    admin_div.appendChild(booking_div)


});

interface Booking {
    sfname: string;
    slname: string;
    hostel: string;
    ofname: string;
    olname: string;
    status: string;
    created: string | Date
}

function load_booking(table: HTMLTableElement, data: Booking[]) {

    let trHead: HTMLTableRowElement = document.createElement("tr");
    trHead.innerHTML =
        "<th>Student Name</th><th>Owner Name</th> <th>Hostel Name</th><th>Book Status</th>";
    table.appendChild(trHead);

    data.forEach((datum) => {
        let tr: HTMLTableRowElement = document.createElement("tr");
        tr.innerHTML = `
            <td>${datum.sfname} ${datum.slname}</td>
            <td>${datum.ofname} ${datum.olname}</td>
            <td>${datum.hostel}</td>
            <td>${datum.status}</td>
        `;
        table.appendChild(tr);
    });
}

// function formatDateForInput(date: Date): string {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
//     const day = String(date.getDate()).padStart(2, '0');
//     return `${year}-${month}-${day}`;
//   }