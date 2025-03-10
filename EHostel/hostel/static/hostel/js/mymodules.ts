export interface UpdatedElementsint {
    editBtn: HTMLButtonElement,
    displayClass: HTMLSpanElement,
    inputClass: HTMLSpanElement,
    cancelBtn: HTMLButtonElement,
    inputElem: HTMLInputElement,
    subbtn: HTMLInputElement,
    column: string
}

export const url: string = "http://127.0.0.1:8001"

export function hideDivElements(btn: HTMLAnchorElement, buttons: HTMLAnchorElement[], seeDiv: HTMLDivElement, elems: HTMLDivElement[]) {
    elems.forEach((elem) => {
        if (!(elem.classList.contains("hide-elem"))) {
            elem.classList.add("hide-elem")
        }
    })
    seeDiv.classList.remove("hide-elem")
}

export function hideUrlDivElements(defaultDiv: HTMLDivElement, divList: HTMLDivElement []) {
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
    const regex =/^(?:\+?254)?(?:0|7|1)(?:[1-9][0-9]{8})$/
    return regex.test(num)
}

export function updateReviews(hostel_id: number) {
    fetch(`${url}/api/student/hostel/comment/${hostel_id}`)
        .then(response => response.json())
        .then(reviews => {
            const commentDiv: HTMLDivElement = document.querySelector(".comments-div")
            commentDiv.innerHTML = ""
            reviews.forEach(review => {
                if (!review.parent_review_id) { // Only top-level reviews
                    const reviewDiv = document.createElement('div');
                    reviewDiv.classList.add('review');

                    const h3 = document.createElement('h3');
                    h3.textContent = `${review.student}'s Review for ${review.hostel}`; // Assuming student and hostel are strings from json.

                    const ratingP = document.createElement('p');
                    ratingP.textContent = `Rating: ${review.rating} / 5`;

                    const commentP = document.createElement('p');
                    commentP.textContent = review.comment;

                    const createdAtP = document.createElement('p');
                    const small = document.createElement('small');
                    small.textContent = `Posted on ${review.created_at}`;
                    createdAtP.appendChild(small);

                    reviewDiv.appendChild(h3);
                    reviewDiv.appendChild(ratingP);
                    reviewDiv.appendChild(commentP);
                    reviewDiv.appendChild(createdAtP);

                    if (review.replies && review.replies.length > 0) {
                        const repliesDiv = document.createElement('div');
                        repliesDiv.classList.add('replies');

                        review.replies.forEach(reply => {
                            const replyDiv = document.createElement('div');
                            replyDiv.classList.add('reply');

                            const h4 = document.createElement('h4');
                            h4.textContent = `${reply.student} replied:`;

                            const replyCommentP = document.createElement('p');
                            replyCommentP.textContent = reply.comment;

                            const replyCreatedAtP = document.createElement('p');
                            const replySmall = document.createElement('small');
                            replySmall.textContent = `Posted on ${reply.created_at}`;
                            replyCreatedAtP.appendChild(replySmall);

                            replyDiv.appendChild(h4);
                            replyDiv.appendChild(replyCommentP);
                            replyDiv.appendChild(replyCreatedAtP);

                            repliesDiv.appendChild(replyDiv);
                        });

                        reviewDiv.appendChild(repliesDiv);
                    }

                    commentDiv.appendChild(reviewDiv);
                }
            });
        })
        .catch(error => console.error('Error fetching reviews:',error))
}   
