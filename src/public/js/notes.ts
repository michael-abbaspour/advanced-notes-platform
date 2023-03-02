/**
 * Client-side scripts for Notes functionality.
 */

const notesSearchBar: HTMLInputElement | null = document.querySelector("#notes-search-bar");
const cards: HTMLElement | null = document.querySelector(".cards");

notesSearchBar?.addEventListener("keyup", function(event) {
	if (event) {
		searchNoteCards();
	}
});

const searchNoteCards = function() {
	const notesSearchBarValue = notesSearchBar?.value;
	const selectNoteCards = cards?.querySelectorAll(".card");

	if (selectNoteCards != null) {
		for (let i = 0; i < selectNoteCards.length; i++) {
			const notesCardHeaderData = selectNoteCards[i].querySelectorAll(".card-header");

			if (notesSearchBarValue != null) {
				// @ts-ignore
				const notesTitleData = notesCardHeaderData[0].textContent.toUpperCase().includes(notesSearchBarValue.toUpperCase());

				if (notesTitleData) {
					selectNoteCards[i].classList.remove("hide");
				} else if (notesSearchBarValue === "") {
					selectNoteCards[i].classList.remove("hide");
				} else {
					selectNoteCards[i].classList.add("hide");
				}
			}
		}
	}
};