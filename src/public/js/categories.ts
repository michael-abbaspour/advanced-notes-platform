/**
 * Frontend scripts for Categories.
 */

const categoryTypesBtn: HTMLButtonElement | null = document.querySelector("#categories-types-dropdown-btn");
const dropdownWrapper: HTMLElement | null = document.querySelector(".dropdown-wrapper");
const dropdownList: HTMLUListElement | null = document.querySelector(".dropdown-list");
const categoriesSearchBar: HTMLInputElement | null = document.querySelector("#categories-search-bar");
const categoriesTable: HTMLTableElement | null = document.querySelector("#categories-table");
const dropdownListItems = dropdownList?.querySelectorAll("li.dropdown-list-item");
const modalItems = {
	openModal: document.querySelectorAll("[data-open]"),
	closeModal: document.querySelectorAll("[data-close]"),
	modalIsVisible: document.querySelector(".modal.is-visible"),
	isVisible: "is-visible"
};

document.addEventListener("click", function(event) {
	if (dropdownWrapper?.classList.contains("active") && event.target !== categoryTypesBtn) {
		//event.stopPropagation();
		dropdownWrapper?.classList.remove("active");
	}
});

categoryTypesBtn?.addEventListener("click", function() {
	if (!dropdownWrapper?.classList.contains("active")) {
		dropdownWrapper?.classList.add("active");
	}
});

categoriesSearchBar?.addEventListener("keyup", function(event) {
	if (event) {
		searchCategoriesTable();
	}
});

dropdownListItems?.forEach(item => {
	item.addEventListener("click", function(event) {
		// @ts-ignore
		const listItemText = event.target.innerText;

		if (categoryTypesBtn != null) {
			categoryTypesBtn.innerText = listItemText;
			filterTableByCategoryType();
		}
	});
});

/*modalItems.openModal.forEach(function(element) {
	element.addEventListener("click", function(this: any) {
		const modalId = this.dataset.open;
		const modalIdTarget = document.getElementById(modalId);

		if (modalIdTarget != null) {
			modalIdTarget.classList.add(modalItems.isVisible);
		}
	});
});*/

/*for (const element of modalItems.openModal) {
	element.addEventListener("click", function(this: any) {
		const modalId = this.dataset.open;
		const modalIdTarget = document.getElementById(modalId);

		if (modalIdTarget != null) {
			modalIdTarget.classList.add(modalItems.isVisible);
		}
	});
}*/

modalItems.closeModal.forEach(function(element) {
	element.addEventListener("click", function (this: any) {
		this.closest(".modal").classList.remove(modalItems.isVisible);
	});
});


/*for (const element of modalItems.closeModal) {
	element.addEventListener("click", function (this: any) {
		this.closest(".modal").classList.remove(modalItems.isVisible);
	});
}*/

/*document.addEventListener("click", function(event) {
	if (event.target === modalItems.modalIsVisible) {
		modalItems.modalIsVisible?.classList.remove(modalItems.isVisible);
	}
});*/

const searchCategoriesTable = function() {
	const categoriesSearchBarValue = categoriesSearchBar?.value;
	const categoryBodyRows = categoriesTable?.querySelectorAll("tbody tr");

	if (categoryBodyRows != null) {
		for (let i = 0; i < categoryBodyRows.length; i++) {
			const categoriesTableData = categoryBodyRows[i].querySelectorAll("td");

			if (categoriesSearchBarValue != null) {
				const categoryNameColumn = categoriesTableData[0].innerText.toUpperCase().includes(categoriesSearchBarValue.toUpperCase());
				const categoryDescriptionColumn = categoriesTableData[2].innerText.toUpperCase().includes(categoriesSearchBarValue.toUpperCase());

				if (categoryNameColumn || categoryDescriptionColumn) {
					categoryBodyRows[i].classList.remove("hide");
				} else if (categoriesSearchBarValue === "") {
					categoryBodyRows[i].classList.remove("hide");
				} else {
					categoryBodyRows[i].classList.add("hide");
				}
			}
		}
	}
};

const filterTableByCategoryType = function() {
	const categoryTypesBtnValue = categoryTypesBtn?.innerText;
	const categoryBodyRows = categoriesTable?.querySelectorAll("tbody tr");

	if (categoryBodyRows != null) {
		for (let i = 0; i < categoryBodyRows.length; i++) {
			const categoryTypeTableData = categoryBodyRows[i].querySelectorAll("td");

			if (categoryTypesBtnValue != null) {
				//const categoryDataContainsHide = categoryTypeTableData[i].classList.contains("dropdown-filter-hide");
				if (categoryTypeTableData[1].innerText.includes(categoryTypesBtnValue)) {
					categoryBodyRows[i].classList.remove("dropdown-filter-hide");
				} else if (categoryTypesBtnValue === "All Category Types")  {
					categoryBodyRows[i].classList.remove("dropdown-filter-hide");
				} else {
					categoryBodyRows[i].classList.add("dropdown-filter-hide");
				}
			}

		}
	}
};


