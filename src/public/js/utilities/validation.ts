/**
 * Utility functions for client-side form validation.
 */

export const isRequired = function (input: HTMLInputElement | HTMLTextAreaElement) {
	const inputValue = input.value;
	return inputValue.trim() !== "";
};

export const maxCharLength = function(input: HTMLInputElement | HTMLTextAreaElement, max: number) {
	const inputValueLength = input.value.trim().length;
	return inputValueLength <= max;
};

export const checkEmailValidity = function(email: HTMLInputElement) {
	const inputValue = email.value;
	const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return reg.test(inputValue.trim());
};

/**
 * Checks for the password's validity.
 * (?=.*[a-z])      ---> The password must contain at least one lowercase character.
 * (?=.*[A-Z])      ---> The password must contain at least one uppercase character.
 * (?=.*[0-9])      ---> The password must contain at least one number.
 * (?=.*[!@#$%^&*]) ---> The password must contain at least one special character.
 * (?=.{8,})        ---> The password must be eight characters or longer
 * @param password - The password being checked.
 */
export const checkPasswordValidity = function(password: HTMLInputElement) {
	const passwordValue = password.value;
	const reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
	return reg.test(passwordValue.trim());
};

export const showError = function(input: HTMLInputElement | HTMLTextAreaElement, message: string) {
	const formField: HTMLElement | null = input.parentElement;

	if (formField != null) {
		formField.classList.remove("success");
		formField.classList.add("error");

		const error: HTMLElement | null = formField.querySelector(".message");

		if (error != null) {
			error.innerText = message;
		}
	}
};

export const showSuccess = function(input: HTMLInputElement | HTMLTextAreaElement) {
	const formField: HTMLElement | null = input.parentElement;

	if (formField != null) {
		formField.classList.remove("error");
		formField.classList.add("success");

		const error: HTMLElement | null = formField.querySelector(".message");

		if (error != null) {
			error.innerText = "";
		}
	}
};

