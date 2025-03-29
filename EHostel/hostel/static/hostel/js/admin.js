var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let stud_btn = document.querySelector("#stud-btn");
let owner_btn = document.querySelector("#owner-btn");
let book_btn = document.querySelector("#book-btn");
let hostel_btn = document.querySelector("#hostel-btn");
let admin_title = document.querySelector("#admin-title");
let admin_div = document.querySelector(".admin-div");
function getData(url) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error status ${response.status}`);
            }
            const data = yield response.json();
            return data.data;
        }
        catch (error) {
            console.log(error);
        }
    });
}
stud_btn.addEventListener("click", function () {
    active_thing();
});
function active_thing() {
    admin_title.innerText = "Student Registry Report";
    admin_div.innerHTML = "";
    let title = document.createElement("h1");
    title.innerText = "Students List";
    admin_div.appendChild(title);
    let print_div = document.createElement("div");
    print_div.classList.add("print-a-div");
    let print_a = document.createElement("a");
    print_a.classList.add("print-a");
    print_a.innerText = "Convert To PDF";
    print_a.href = "/myadmin/get_students/download/";
    print_div.appendChild(print_a);
    admin_div.appendChild(print_div);
    let stud_div = document.createElement("div");
    let stud_table = document.createElement("table");
    load_person(stud_table, "/myadmin/get_students/", "Admission Number");
    stud_div.appendChild(stud_table);
    admin_div.appendChild(stud_div);
}
active_thing();
function load_person(table, url, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getData(url);
        let trHead = document.createElement("tr");
        trHead.innerHTML = `<th>${title}</th> <th>Name</th> <th>Email</th><th>Contact</th>`;
        table.appendChild(trHead);
        data.forEach(datum => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${datum.admin}</td>
            <td>${datum.fname} ${datum.lname}</td>
            <td>${datum.email}</td>
            <td>${datum.contact}</td>
        `;
            table.appendChild(tr);
        });
    });
}
function load_owner(table, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getData(url);
        let trHead = document.createElement("tr");
        trHead.innerHTML = `<th>Name</th> <th>Email</th><th>Contact</th>`;
        table.appendChild(trHead);
        data.forEach(datum => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${datum.fname} ${datum.lname}</td>
            <td>${datum.email}</td>
            <td>${datum.contact}</td>
        `;
            table.appendChild(tr);
        });
    });
}
owner_btn.addEventListener("click", function () {
    admin_div.innerHTML = "";
    let title = document.createElement("h1");
    title.innerText = "Convert To PDF";
    admin_div.appendChild(title);
    let print_div = document.createElement("div");
    print_div.classList.add("print-a-div");
    let print_a = document.createElement("a");
    print_a.classList.add("print-a");
    print_a.innerText = "Print Owners";
    print_a.href = "/myadmin/get_owners/download/";
    print_div.appendChild(print_a);
    admin_div.appendChild(print_div);
    let owner_div = document.createElement("div");
    let owner_table = document.createElement("table");
    load_person(owner_table, "/myadmin/get_owners/", "UserName");
    owner_div.appendChild(owner_table);
    admin_div.appendChild(owner_div);
});
hostel_btn.addEventListener("click", function () {
    admin_div.innerHTML = "";
    let title = document.createElement("h1");
    title.innerText = "Hostel List";
    admin_div.appendChild(title);
    let print_div = document.createElement("div");
    print_div.classList.add("print-a-div");
    let print_a = document.createElement("a");
    print_a.classList.add("print-a");
    print_a.innerText = "Convert to PDF";
    print_a.href = "/myadmin/get_hostels/download/";
    print_div.appendChild(print_a);
    admin_div.appendChild(print_div);
    let hostel_div = document.createElement("div");
    let hostel_table = document.createElement("table");
    load_hostel(hostel_table, "/myadmin/get_hostels/");
    hostel_div.appendChild(hostel_table);
    admin_div.appendChild(hostel_div);
});
function load_hostel(table, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getData(url);
        let trHead = document.createElement("tr");
        trHead.innerHTML = "<th>Name</th> <th>Owner Name</th> <th>Rent(ksh)</th><th>Location</th><th>Type</th><th>Capacity</th><th>Empty Rooms</th>";
        table.appendChild(trHead);
        data.forEach(datum => {
            let tr = document.createElement("tr");
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
    });
}
book_btn.addEventListener("click", function () {
    admin_div.innerHTML = "";
    let title = document.createElement("h1");
    title.innerText = "Booking List";
    admin_div.appendChild(title);
    let button_div = document.createElement("div");
    let url = "/myadmin/get_bookings/all/";
    let print_div = document.createElement("div");
    print_div.classList.add("print-a-div");
    let choice_arr = [{
            btn: document.createElement("button"),
            url: "/myadmin/get_bookings/all/",
            title: "History",
            a_title: "Print All",
            a_url: "/myadmin/get_bookings/download/all/",
        }, {
            btn: document.createElement("button"),
            url: "/myadmin/get_bookings/Accept/",
            title: "Accepted",
            a_title: "Print Accepted",
            a_url: "/myadmin/get_bookings/download/Accept/"
        }, {
            btn: document.createElement("button"),
            url: "/myadmin/get_bookings/Reject/",
            title: "Rejected",
            a_title: "Print Rejected",
            a_url: "/myadmin/get_bookings/download/Reject/"
        }, {
            btn: document.createElement("button"),
            url: "/myadmin/get_bookings/Pending/",
            title: "Pending",
            a_title: "Print Pending",
            a_url: "/myadmin/get_bookings/download/Pending/"
        }, {
            btn: document.createElement("button"),
            url: "/myadmin/get_bookings/EndLease/",
            title: "Complete Lease",
            a_title: "Print Complete Lease",
            a_url: "/myadmin/get_bookings/download/EndLease/"
        }, {
            btn: document.createElement("button"),
            url: "/myadmin/get_bookings/Cancel/",
            title: "Cancelled",
            a_title: "Print Cancelled",
            a_url: "/myadmin/get_bookings/download/Cancel/"
        }
    ];
    let booking_div = document.createElement("div");
    let booking_table = document.createElement("table");
    choice_arr.forEach(choice => {
        choice.btn.innerText = choice.title;
        choice.btn.classList.add("admin-booking-btns");
        choice.btn.addEventListener("click", function () {
            booking_table.innerHTML = "";
            load_booking(booking_table, choice.url);
        });
        button_div.appendChild(choice.btn);
        let a = document.createElement("a");
        a.classList.add("print-a");
        a.href = choice.a_url;
        a.innerText = choice.a_title;
        print_div.appendChild(a);
    });
    admin_div.appendChild(button_div);
    admin_div.appendChild(print_div);
    load_booking(booking_table, url);
    booking_div.appendChild(booking_table);
    admin_div.appendChild(booking_div);
});
function load_booking(table, url) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield getData(url);
        let trHead = document.createElement("tr");
        trHead.innerHTML = "<th>Student Name</th><th>Owner Name</th> <th>Hostel Name</th><th>Book Status</th>";
        table.appendChild(trHead);
        data.forEach(datum => {
            let tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${datum.sfname} ${datum.slname}</td>
            <td>${datum.ofname} ${datum.olname}</td>
            <td>${datum.hostel}</td>
            <td>${datum.status}</td>
        `;
            table.appendChild(tr);
        });
    });
}
