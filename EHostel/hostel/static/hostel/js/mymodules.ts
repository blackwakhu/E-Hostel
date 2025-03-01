export interface UpdatedElementsint {
    editBtn: HTMLButtonElement,
    displayClass: HTMLSpanElement,
    inputClass: HTMLSpanElement,
    cancelBtn: HTMLButtonElement,
    formElem: HTMLFormElement,
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

async function updateStudent(admissionNumber: string, column: string, newValue: any): Promise<any> {
    const csrfToken = (document.querySelector('input[name="csrfmiddlewaretoken"]') as HTMLInputElement)?.value;
  
    try {
      const response = await fetch(`${url}/api/student/update/${admissionNumber}/${column}/`, {
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
      throw error; // Re-throw the error to be handled by the caller
    }
  }
  
  // Example usage within an event handler or other function:
  export async function handleUpdateClick(admissionNumber: string, column: string, newValue: any, messageElement: HTMLElement) {
    try {
      const result = await updateStudent(admissionNumber, column, newValue);
      messageElement.textContent = result.output;
      console.log('Update result:', result);
      // You can also access result.output if it's available
    } catch (error: any) {
        let errmsg: string = error.message || 'An error occurred during update.';
        alert(errmsg)
    }
  }

// export function saveData(inp: HTMLInputElement) {
//     const data = inp.value
    
// }

// updateButton.addEventListener('click', () => {
//     const firstName = firstNameInput.value;
//     const studentId = (document.getElementById('studentId') as HTMLInputElement).value; // Get student ID from a hidden input

//     fetch(`/update_student_name/${studentId}/`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': (document.querySelector('input[name="csrfmiddlewaretoken"]') as HTMLInputElement).value, // Get CSRF token
//         },
//         body: JSON.stringify({ firstName: firstName }),
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data && data.message) {
//             messageElement.textContent = data.message;
//         } else {
//             messageElement.textContent = "Response missing message";
//         }
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//         messageElement.textContent = 'Error updating student name.';
//     });
// });