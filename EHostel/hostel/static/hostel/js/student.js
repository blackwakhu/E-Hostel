var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { hideDivElements, hideUrlDivElements, hideEditElements, handleUpdateClick, validateNumber } from "./mymodules.js";
// this will reference the menu buttons
let home_btn_student = document.querySelector(".home");
let hostels_btn_student = document.querySelector(".hostels");
let my_hostel_btn_student = document.querySelector(".my-hostel");
let my_account_btn_student = document.querySelector(".my-account");
let search_btn_student = document.querySelector(".search");
// for pagination
const hostel_page = document.querySelector(".hostel_page");
const prevButton = document.querySelector('#prev-button');
const nextButton = document.querySelector('#next-button');
// this are the major div elements that display information in the student.html file
let home_div_student = document.querySelector(".home-html");
let hostels_div_student = document.querySelector(".hostels-html");
let my_hostel_div_student = document.querySelector(".my-hostel-html");
let my_account_div_student = document.querySelector(".my-account-html");
let search_div_student = document.querySelector(".search-html");
;
// this gets the student admission number fromt the html file
const admin = document.querySelector("#stud-admin").textContent;
// this array includes all the major iv elements that divide the student.html file
let divElements_student = [home_div_student, hostels_div_student, my_hostel_div_student, my_account_div_student, search_div_student];
// this array contains all the menu items
let buttonElements_student = [home_btn_student, hostels_btn_student, my_hostel_btn_student, my_account_btn_student, search_btn_student];
// this array contains a an interface that will the above to be efficiently manipulated
let btnObj_student = new Array();
// this is an interface that contains elements that will form variables for updatng the student account
let updateElements = [
    {
        editBtn: document.querySelector("#stud-fname-btn"),
        displayClass: document.querySelector(".stud-fname-display"),
        inputClass: document.querySelector(".stud-fname-input"),
        cancelBtn: document.querySelector("#stud_fname_cancel"),
        inputElem: document.querySelector("#stud-fname-inp"),
        subbtn: document.querySelector("#stud-fname-sub"),
        column: "first_name"
    },
    {
        editBtn: document.querySelector("#stud-lname-btn"),
        displayClass: document.querySelector(".stud-lname-display"),
        inputClass: document.querySelector(".stud-lname-input"),
        cancelBtn: document.querySelector("#stud_lname_cancel"),
        inputElem: document.querySelector("#stud-lname-inp"),
        subbtn: document.querySelector("#stud-lname-sub"),
        column: "last_name"
    },
    {
        editBtn: document.querySelector("#stud-email-btn"),
        displayClass: document.querySelector(".stud-email-display"),
        inputClass: document.querySelector(".stud-email-input"),
        cancelBtn: document.querySelector("#stud_email_cancel"),
        inputElem: document.querySelector("#stud-email-inp"),
        subbtn: document.querySelector("#stud-email-sub"),
        column: "email"
    },
    {
        editBtn: document.querySelector("#stud-contact-btn"),
        displayClass: document.querySelector(".stud-contact-display"),
        inputClass: document.querySelector(".stud-contact-input"),
        cancelBtn: document.querySelector("#stud_contact_cancel"),
        inputElem: document.querySelector("#stud-contact-inp"),
        subbtn: document.querySelector("#stud-contact-sub"),
        column: "phone_number"
    }
];
for (let i = 0; i < divElements_student.length; i++) {
    btnObj_student.push({ "button": buttonElements_student[i], "div": divElements_student[i] });
}
function searchButtonFind() {
    return __awaiter(this, void 0, void 0, function* () {
        // the div element element that will display all the seach results
        let search_results_div_stud = document.querySelector(".search_results_div");
        let query_item_ = document.querySelector("#name_query_input").value;
        try {
            const response = yield fetch(`/api/student/hostel/search?search=${encodeURIComponent(query_item_)}`);
            if (!response.ok) {
                throw new Error(`HTTP error status: ${response.status}`);
            }
            const data = yield response.json();
            search_results_div_stud.innerHTML = '';
            if (data.length === 0) {
                search_results_div_stud.innerHTML = '<p>No results found</p>';
                return;
            }
            data.forEach(hostel => {
                // const hostelDiv = document.createElement('div')
                // hostelDiv.innerHTML = `
                //     <h3>${hostel.hostel_name}</h3>
                //     <p>status: ${hostel.status}</p>
                //     <hr>`
                const myHostel = {
                    hostel: {
                        id: hostel.id,
                        hostel_name: hostel.hostel_name,
                        price_per_month: hostel.price_per_month,
                        locality: hostel.locality,
                        image: hostel.image
                    }
                };
                search_results_div_stud.appendChild(HostelCard(myHostel));
            });
        }
        catch (error) {
            console.error('Error getching hostels:', error);
            search_results_div_stud.innerHTML = '<p>An error occured while searching</p>';
        }
    });
}
;
function HostelCard(props) {
    const cardContainer = document.createElement("div");
    cardContainer.classList.add("card-container");
    const card = document.createElement("div");
    card.classList.add("card");
    const image = document.createElement("img");
    image.src = props.hostel.image || 'placeholder-image.jpg'; // Use placeholder if no image
    image.alt = props.hostel.hostel_name;
    card.appendChild(image);
    const cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    const h3 = document.createElement("h3");
    h3.innerText = props.hostel.hostel_name;
    cardContent.appendChild(h3);
    const price = document.createElement('p');
    price.textContent = `Price: ksh. ${props.hostel.price_per_month}/month`;
    cardContent.appendChild(price);
    const locality = document.createElement('p');
    locality.textContent = `Locality: ${props.hostel.locality}`;
    cardContent.appendChild(locality);
    const link = document.createElement("a");
    link.href = `/student/hostel/${props.hostel.id}/`;
    link.classList.add("btn-link");
    link.innerHTML = "See More";
    cardContent.appendChild(link);
    card.appendChild(cardContent);
    cardContainer.appendChild(card);
    return cardContainer;
}
class HostelList {
    fetchHostels() {
        return __awaiter(this, arguments, void 0, function* (page = 1) {
            const response = yield fetch(`/api/student/hostel/hostel/list?page=${page}`); // Replace with your actual URL
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
        if (this.inputs.hostel_div) {
            this.inputs.hostel_div.innerHTML = ''; // Clear previous list
            this.hostels.forEach(hostel => {
                const card = HostelCard({ hostel });
                this.inputs.hostel_div.appendChild(card);
            });
        }
        if (this.inputs.prev) {
            this.inputs.prev.disabled = !(this.currentPage > 1);
        }
        if (this.inputs.next) {
            this.inputs.next.disabled = !(this.currentPage < this.numPages);
        }
    }
    constructor(inputs) {
        this.currentPage = 1;
        this.hostels = [];
        this.numPages = 0;
        this.inputs = inputs;
        this.fetchHostels(1);
        if (this.inputs.prev) {
            this.inputs.prev.addEventListener('click', () => this.previousPage());
        }
        if (this.inputs.next) {
            this.inputs.next.addEventListener('click', () => this.nextPage());
        }
    }
}
new HostelList({
    hostel_div: hostel_page,
    prev: prevButton,
    next: nextButton
});
document.addEventListener("DOMContentLoaded", () => {
    btnObj_student.forEach((bObj) => {
        if (bObj) {
            bObj.button.addEventListener("click", () => {
                hideDivElements(bObj.button, buttonElements_student, bObj.div, divElements_student);
            });
        }
    });
    hideUrlDivElements(home_div_student, divElements_student);
    // this function will deal with displaying the search 
    document.querySelector("#search_button").addEventListener("click", () => {
        searchButtonFind();
    });
    updateElements.forEach((elem) => {
        elem.editBtn.addEventListener("click", () => { hideEditElements(elem.editBtn, elem.displayClass, elem.inputClass, elem.cancelBtn, "hide-div"); });
        elem.cancelBtn.addEventListener("click", () => { hideEditElements(elem.cancelBtn, elem.inputClass, elem.displayClass, elem.editBtn, "hide-div"); });
        elem.subbtn.addEventListener("click", () => {
            // saveData(elem.inputElem)
            if (elem.column === "phone_number" && !(validateNumber(elem.inputElem.value))) {
                alert("The phone number is not valid");
            }
            else {
                const elemurl = `/api/student/update/${admin}/${elem.column}/`;
                handleUpdateClick(elemurl, elem.column, elem.inputElem.value, elem.displayClass);
                hideEditElements(elem.cancelBtn, elem.inputClass, elem.displayClass, elem.editBtn, "hide-div");
            }
        });
    });
    new HostelList({
        hostel_div: hostel_page,
        prev: prevButton,
        next: nextButton
    });
});
