/**
 * Scripts for the Register page and form. Example includes client-side validation.
 */

import { isRequired, maxCharLength, checkEmailValidity, checkPasswordValidity, showError, showSuccess } from "./utilities/validation.js";

const registerForm: HTMLFormElement | null = document.querySelector("#register-form");
const firstName: HTMLInputElement | null = document.querySelector("#first_name");
const lastName: HTMLInputElement | null = document.querySelector("#last_name");
const userEmail: HTMLInputElement | null = document.querySelector("#user_email");
const userPassword: HTMLInputElement | null = document.querySelector("#user_password");
const confirmPassword: HTMLInputElement | null = document.querySelector("#confirm_user_password");

const checkFirstName = function() {
	let valid = false;
	const max = 30;

	if (firstName != null) {
		if (!isRequired(firstName)) {
			showError(firstName, "First Name cannot be blank");
		} else if (!maxCharLength(firstName, max)) {
			showError(firstName, `First Name cannot exceed ${max} characters.`);
		} else {
			showSuccess(firstName);
			valid = true;
		}
	}
	return valid;
};

const checkLastName = function() {
	let valid = false;
	const max = 30;

	if (lastName != null) {
		if (!isRequired(lastName)) {
			showError(lastName, "Last Name cannot be blank");
		} else if (!maxCharLength(lastName, max)) {
			showError(lastName, `Last Name cannot exceed ${max} characters.`);
		} else {
			showSuccess(lastName);
			valid = true;
		}
	}
	return valid;
};

const checkEmail = function() {
	let valid = false;

	if (userEmail != null) {
		if (!isRequired(userEmail)) {
			showError(userEmail, "Email cannot be blank.");
		} else if (!checkEmailValidity(userEmail)) {
			showError(userEmail, "Email is not valid.");
		} else {
			showSuccess(userEmail);
			valid = true;
		}
	}
	return valid;
};

const checkPassword = function() {
	let valid = false;

	if (userPassword != null) {
		if (!isRequired(userPassword)) {
			showError(userPassword, "Password cannot be blank.");
		} else if (!checkPasswordValidity(userPassword)) {
			showError(userPassword, "Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)");
		} else {
			showSuccess(userPassword);
			valid = true;
		}
	}
	return valid;
};

const checkConfirmPassword = function() {
	let valid = false;

	const confirmPasswordValue = confirmPassword?.value.trim();
	const userPasswordValue = userPassword?.value.trim();

	if (confirmPassword != null) {
		if (!isRequired(confirmPassword)) {
			showError(confirmPassword, "Please enter the Password again.");
		} else if (userPasswordValue !== confirmPasswordValue) {
			showError(confirmPassword, "The Confirm Password value does not match the Password value.");
		} else {
			showSuccess(confirmPassword);
			valid = true;
		}
	}
	return valid;
};

if (registerForm != null) {
	registerForm.addEventListener("submit", function(event) {
		const isFirstNameValid = checkFirstName(),
			isLastNameValid = checkLastName(),
			isEmailValid = checkEmail(),
			isPasswordValid = checkPassword(),
			isConfirmPasswordValid = checkConfirmPassword();

		const isFormValid = isFirstNameValid && isLastNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

		if (!isFormValid) {
			event.preventDefault();
		}
	});

	registerForm.addEventListener("input", function(event: Event) {
		const eventTargetId = (event.target as HTMLInputElement).id;

		switch (eventTargetId) {
		case "first_name":
			checkFirstName();
			break;
		case "last_name":
			checkLastName();
			break;
		case "user_email":
			checkEmail();
			break;
		case "user_password":
			checkPassword();
			break;
		case "confirm_user_password":
			checkConfirmPassword();
			break;
		}
	});
}


