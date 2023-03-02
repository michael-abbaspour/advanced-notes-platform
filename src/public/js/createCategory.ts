/**
 * Client-side scripts for the Create Category page/form.
 */

import { isRequired, maxCharLength, showError, showSuccess } from "./utilities/validation.js";

const createCategoryForm: HTMLFormElement | null = document.querySelector("#create-category-form");
const categoryName: HTMLInputElement | null = document.querySelector("#category_name");
const categoryDescription: HTMLTextAreaElement | null = document.querySelector("#category_description");

const checkCategoryName = function() {
	let valid = false;
	const max = 30;

	if (categoryName != null) {
		if (!isRequired(categoryName)) {
			showError(categoryName, "Category Name cannot be blank");
		} else if (!maxCharLength(categoryName, max)) {
			showError(categoryName, `Category Name cannot exceed ${max} characters.`);
		} else {
			showSuccess(categoryName);
			valid = true;
		}
	}
	return valid;
};

const checkCategoryDescription = function() {
	let valid = false;
	const max = 200;

	if (categoryDescription != null) {
		if (!isRequired(categoryDescription)) {
			showError(categoryDescription, "Category Description cannot be blank.");
		} else if (!maxCharLength(categoryDescription, max)) {
			showError(categoryDescription, `Category Description cannot exceed ${max} characters`);
		} else {
			showSuccess(categoryDescription);
			valid = true;
		}
	}
	return valid;
};

