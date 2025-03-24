export interface UpdatedElementsint {
  editBtn: HTMLButtonElement,
  displayClass: HTMLSpanElement,
  inputClass: HTMLSpanElement,
  cancelBtn: HTMLButtonElement,
  inputElem: HTMLInputElement,
  subbtn: HTMLInputElement,
  column: string
}

export interface Hostel {
  id: number;
  hostel_name: string;
  price_per_month: number;
  locality: string;
  image: string | null;
};

export interface HostelResponse {
  hostels: Hostel[];
  page: number;
  num_pages: number;
  has_previous: boolean;
  has_next: boolean;
  previous_page_number: number | null;
  next_page_number: number | null;
}

export interface hostelInputs {
  hostel_div: HTMLDivElement,
  prev: HTMLButtonElement,
  next: HTMLButtonElement
};

export interface hostelCardProps {
  hostel: Hostel
}

export interface Review {
  id: number;
  student: string;
  comment: string;
  rating: number;
  created_at: string;
  replies: Review[];
}

export function hideDivElements(btn: HTMLAnchorElement, buttons: HTMLAnchorElement[], seeDiv: HTMLDivElement, elems: HTMLDivElement[]) {
  elems.forEach((elem) => {
    if (!(elem.classList.contains("hide-elem"))) {
      elem.classList.add("hide-elem")
    }
  })
  seeDiv.classList.remove("hide-elem")
}

export function hideUrlDivElements(defaultDiv: HTMLDivElement, divList: HTMLDivElement[]) {
  const hash = window.location.hash.substring(1);

  if (hash) {
    const targetDiv = document.querySelector<HTMLDivElement>(`.${hash}`);

    if (hash && targetDiv) {
      divList.forEach(elem => elem.classList.add("hide-elem"));
      targetDiv.classList.remove("hide-elem");
    } else {
      defaultDiv.classList.remove("hide-elem");
    }
  } else {
    defaultDiv.classList.remove("hide-elem");
  }
}

export function hideButtonElements(btn: HTMLButtonElement, hide_btns: HTMLButtonElement[]) {
  hide_btns.forEach(hide_btn => {
    hide_btn.style.display = "none"
  })
  btn.style.display = "block"
}

export function hideEditElements(btn: HTMLButtonElement, visibleClass: HTMLSpanElement, hideClass: HTMLSpanElement, extBtn: HTMLButtonElement, classStr: string) {
  if (hideClass.classList.contains(classStr)) {
    hideClass.classList.remove(classStr)
  } if (extBtn.classList.contains(classStr)) {
    extBtn.classList.remove(classStr)
  }
  visibleClass.classList.add(classStr)
  btn.classList.add(classStr)
}

async function updateData(myurl: string, column: string, newValue: any): Promise<any> {
  const csrfToken = (document.querySelector('input[name="csrfmiddlewaretoken"]') as HTMLInputElement)?.value;

  try {
    const response = await fetch(myurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken || '', // Include CSRF token
      },
      body: JSON.stringify({ [column]: newValue }), // Dynamically create JSON body
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
}

export async function handleUpdateClick(myurl: string, column: string, newValue: any, messageElement: HTMLSpanElement) {
  try {
    const result = await updateData(myurl, column, newValue);
    messageElement.textContent = result.output;
  } catch (error: any) {
    let errmsg: string = error.message || 'An error occurred during update.';
    alert(errmsg)
  }
}

export function validatePassword(password: string): boolean {
  const regex = /^(?=.*[A-Za-z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return regex.test(password)
}

export function validateNumber(num: string): boolean {
  const regex = /^(?:\+?254)?(?:0|7|1)(?:[1-9][0-9]{8})$/
  return regex.test(num)
}

export function HostelCard(props: hostelCardProps): HTMLDivElement {
  const cardContainer: HTMLDivElement = document.createElement("div")
  cardContainer.classList.add("card-container")

  const card: HTMLDivElement = document.createElement("div")
  card.classList.add("card")

  const image: HTMLImageElement = document.createElement("img")
  image.src = props.hostel.image || 'placeholder-image.jpg'; // Use placeholder if no image
  image.alt = props.hostel.hostel_name;
  card.appendChild(image)

  const cardContent: HTMLDivElement = document.createElement("div")
  cardContent.classList.add("card-content")

  const h3: HTMLHeadElement = document.createElement("h3")
  h3.innerText = props.hostel.hostel_name
  cardContent.appendChild(h3)

  const price = document.createElement('p');
  price.textContent = `Price: ksh. ${props.hostel.price_per_month}/month`;
  cardContent.appendChild(price);

  const locality = document.createElement('p');
  locality.textContent = `Locality: ${props.hostel.locality}`;
  cardContent.appendChild(locality);

  const link: HTMLAnchorElement = document.createElement("a")
  link.href = `/student/hostel/${props.hostel.id}/`
  link.classList.add("btn-link")
  link.innerHTML = "See More"
  cardContent.appendChild(link)

  card.appendChild(cardContent)
  cardContainer.appendChild(card)
  return cardContainer
}

export function hideSingleElements(toHide: HTMLElement, toSee: HTMLElement) {
  toHide.style.display = "none"
  toSee.style.display = "block"
}

export async function alterAmenity(url: string): Promise<void> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (error) {
    console.error("Error adding a new amenity", error)
  }
}

export async function verifyBooking(book_id: number, choice: string): Promise<void> {
  try {
    const response = await fetch(`/owner/hostel/book/${book_id}/${choice}/`)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  }catch (error) {
    console.error("Error adding a new amenity", error)
  }
}
