const userName = document.querySelector('#username');
const password = document.querySelector('#password');
const password2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const sendBtn = document.querySelector('.send');
const clearBtn = document.querySelector('.clear');
const closeBtn = document.querySelector('.close');
const popup = document.querySelector('.popup');

const inputs = document.querySelectorAll('input');

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');
	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = input => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = input => {
	input.forEach(el => {
		el.value === '' ? showError(el, el.placeholder) : clearError(el);
	});
};

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `${input.previousElementSibling.innerText.slice(0, -1)} składa się z min. ${min} znaków`);
	}
};

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Hasła do siebie nie pasują');
	}
};

const checkEmail = email => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'E-mail jest niepoprawny');
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-box');
	let errorCount = 0;

	allInputs.forEach(input => {
		if (input.classList.contains('error')) {
			errorCount++;
		}
	});
	console.log(errorCount);
	if (errorCount === 0) {
		popup.classList.add('show-popup');
	}
};

sendBtn.addEventListener('click', e => {
	e.preventDefault();

	checkForm(inputs);
	checkLength(userName, 3);
	checkLength(password, 8);
	checkPassword(password, password2);
	checkEmail(email);
	checkErrors();
});

clearBtn.addEventListener('click', e => {
	e.preventDefault();

	inputs.forEach(input => {
		input.value = '';
		clearError(input);
	});
});
