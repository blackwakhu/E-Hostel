var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const url = "http://127.0.0.1:8001";
export function hideDivElements(btn, buttons, seeDiv, elems) {
    elems.forEach((elem) => {
        if (!(elem.classList.contains("hide-elem"))) {
            elem.classList.add("hide-elem");
        }
    });
    seeDiv.classList.remove("hide-elem");
}
export function hideUrlDivElements(defaultDiv, divList) {
    const hash = window.location.hash.substring(1);
    if (hash) {
        const targetDiv = document.querySelector(`.${hash}`);
        if (hash && targetDiv) {
            divList.forEach(elem => elem.classList.add("hide-elem"));
            targetDiv.classList.remove("hide-elem");
        }
        else {
            defaultDiv.classList.remove("hide-elem");
        }
    }
    else {
        defaultDiv.classList.remove("hide-elem");
    }
}
export function hideEditElements(btn, visibleClass, hideClass, extBtn, classStr) {
    if (hideClass.classList.contains(classStr)) {
        hideClass.classList.remove(classStr);
    }
    if (extBtn.classList.contains(classStr)) {
        extBtn.classList.remove(classStr);
    }
    visibleClass.classList.add(classStr);
    btn.classList.add(classStr);
}
function updateStudent(admissionNumber, column, newValue) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const csrfToken = (_a = document.querySelector('input[name="csrfmiddlewaretoken"]')) === null || _a === void 0 ? void 0 : _a.value;
        try {
            const response = yield fetch(`${url}/api/student/update/${admissionNumber}/${column}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrfToken || '', // Include CSRF token
                },
                body: JSON.stringify({ [column]: newValue }), // Dynamically create JSON body
            });
            if (!response.ok) {
                const errorData = yield response.json();
                throw new Error(errorData.message || 'Network response was not ok');
            }
            const data = yield response.json();
            return data;
        }
        catch (error) {
            console.error('Error updating student:', error);
            throw error; // Re-throw the error to be handled by the caller
        }
    });
}
// Example usage within an event handler or other function:
export function handleUpdateClick(admissionNumber, column, newValue, messageElement) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield updateStudent(admissionNumber, column, newValue);
            messageElement.textContent = result.message;
            console.log('Update result:', result);
            // You can also access result.output if it's available
        }
        catch (error) {
            let errmsg = error.message || 'An error occurred during update.';
            alert(errmsg);
        }
    });
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
