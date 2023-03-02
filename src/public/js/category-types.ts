/**
 * Frontend scripts for Category Types and its related components.
 */

const categoryTypesSearchBar: HTMLInputElement | null = document.querySelector("#category-types-search-bar");
const categoryTypesTable: HTMLTableElement | null = document.querySelector("#category-types-table");

categoryTypesSearchBar?.addEventListener("keyup", function(event) {
	if (event) {
		searchCategoryTypesTable();
	}
});

const searchCategoryTypesTable = function() {
	const categoryTypesSearchBarValue = categoryTypesSearchBar?.value;
	const categoryTypeBodyRows = categoryTypesTable?.querySelectorAll("tbody tr");

	if (categoryTypeBodyRows != null) {
		for (let i = 0; i < categoryTypeBodyRows.length; i++) {
			const categoryTypesTableData = categoryTypeBodyRows[i].querySelectorAll("td");

			if (categoryTypesSearchBarValue != null) {
				const categoryTypeNameColumn = categoryTypesTableData[0].innerText.toUpperCase().includes(categoryTypesSearchBarValue.toUpperCase());

				if (categoryTypeNameColumn) {
					categoryTypeBodyRows[i].classList.remove("hide");
				} else if (categoryTypesSearchBarValue === "") {
					categoryTypeBodyRows[i].classList.remove("hide");
				} else {
					categoryTypeBodyRows[i].classList.add("hide");
				}
			}
		}
	}
};