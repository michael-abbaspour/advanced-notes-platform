/**
 * Client-side scripts for Tags.
 */

const tagsSearchBar: HTMLInputElement | null = document.querySelector("#tags-search-bar");
const tagsTable: HTMLTableElement | null = document.querySelector("#tags-table");

tagsSearchBar?.addEventListener("keyup", function(event) {
	if (event) {
		searchTagsTable();
	}
});

const searchTagsTable = function() {
	const tagsSearchBarValue = tagsSearchBar?.value;
	const tagsBodyRows = tagsTable?.querySelectorAll("tbody tr");

	if (tagsBodyRows != null) {
		for (let i = 0; i < tagsBodyRows.length; i++) {
			const tagsTableData = tagsBodyRows[i].querySelectorAll("td");

			if (tagsSearchBarValue != null) {
				const tagNameColumn = tagsTableData[0].innerText.toUpperCase().includes(tagsSearchBarValue.toUpperCase());
				const tagDescriptionColumn = tagsTableData[1].innerText.toUpperCase().includes(tagsSearchBarValue.toUpperCase());

				if (tagNameColumn || tagDescriptionColumn) {
					tagsBodyRows[i].classList.remove("hide");
				} else if (tagsSearchBarValue === "") {
					tagsBodyRows[i].classList.remove("hide");
				} else {
					tagsBodyRows[i].classList.add("hide");
				}
			}
		}
	}
};