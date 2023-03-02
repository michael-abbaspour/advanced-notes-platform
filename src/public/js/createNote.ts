/**
 * Scripts used for the Add/Create Note form.
 */

import {isRequired, maxCharLength, showError, showSuccess} from "./utilities/validation.js";

const createNoteForm = document.querySelector("#create-note-form");
const noteTitleInput: HTMLInputElement | null = document.querySelector("#note_title");
const tagSelect = document.querySelector("#tag_id");
const noteBodyTextarea = document.querySelector("#note_body");

const checkNoteTitle = function() {
	let valid = false;
	const max = 30;

	if (noteTitleInput != null) {
		if (!isRequired(noteTitleInput)) {
			showError(noteTitleInput, "Note Title cannot be empty.");
		} else if (!maxCharLength(noteTitleInput, max)) {
			showError(noteTitleInput, `Note Title cannot exceed ${max} characters.`);
		} else {
			showSuccess(noteTitleInput);
			valid = true;
		}
	}
	return valid;
};

/*if (tagSelect != null) {
	tagSelect.addEventListener("change",
		function () {
			let verifiedOptions: Array<Element> = [];
			const tagSelectAllOptionsChecked = tagSelect.querySelectorAll("option:checked");
			const tagSelectAllOptions = tagSelect.querySelectorAll("option");
			if (tagSelectAllOptionsChecked.length <= 3) {
				verifiedOptions = [...tagSelectAllOptionsChecked];
			} else {
				tagSelectAllOptions.forEach(function (optionElement) {
					optionElement.selected = verifiedOptions.indexOf(optionElement) > -1;
				});
			}
		}
	);
}*/

if (createNoteForm != null) {
	createNoteForm.addEventListener("submit", function(event) {
		const isFormValid = checkNoteTitle();

		if (!isFormValid) {
			event.preventDefault();
		}
	});

	createNoteForm.addEventListener("input", function(event) {
		const eventTargetId = (event.target as HTMLInputElement).id;

		switch (eventTargetId) {
		case "note_title":
			checkNoteTitle();
			break;
		}
	});
}