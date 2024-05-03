var csrftoken;

async function updateNickname(nicknameForm) {

	const msgElement = document.getElementById("form__update--nickname--msg");

	// remove a potential error message from the field
	msgElement.textContent = "";
	msgElement.classList.remove("text-danger");
	msgElement.classList.remove("text-info");

	const input = nicknameForm.elements;

	const init = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify({nickname: input.nickname.value}),
		credentials: 'same-origin',
		referrerPolicy: 'same-origin',
	};

	try {
		let hostnameport = "https://" + window.location.host

		const response = await fetch(hostnameport + '/api/profile/', init);

		if (response.status === 400) {
			const error = await response.text();
			msgElement.textContent = error.replace(/["{}[\]]/g, '');
			msgElement.classList.add("text-danger");
			return;
		}
		if (response.status === 200) {
			const data = await response.json();

			sessionStorage.setItem("nickname", data.nickname);

			msgElement.textContent = "Your nickname was successfully updated.";
			msgElement.classList.remove("text-danger");
			msgElement.classList.add("text-info");

			window.location.reload();
		}

	} catch (e) {
		console.error(e);
	}
};

async function updatePassword(passwordForm) {

	const msgElement = document.getElementById("form__update--password--msg");

	// remove a potential error message from the field
	msgElement.textContent = "";
	msgElement.classList.remove("text-danger");
	msgElement.classList.remove("text-info");

	const input = passwordForm.elements;

	if (input.password_one.value !== input.password_two.value) {
		msgElement.textContent = "The passwords are not the same";
		msgElement.classList.add("text-danger");
		return;
	}

	const init = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		},
		body: JSON.stringify({password: input.password_one.value})
	};

	try {

		let hostnameport = "https://" + window.location.host

		const response = await fetch(hostnameport + '/api/profile/', init);

		if (response.status === 400) {
			const error = await response.text();
			msgElement.textContent = error.replace(/["{}[\]]/g, '');
			msgElement.classList.add("text-danger");
			return;
		}
		if (response.status === 200) {
			const data = await response.json();

			msgElement.textContent = "Your password was successfully updated.";
			msgElement.classList.remove("text-danger");
			msgElement.classList.add("text-info");
		}
	} catch (e) {
		console.error(e);
	}
};

async function updateAvatar() {

	const msgElement = document.getElementById("form__update--avatar--msg");

	// remove a potential error message from the field
	msgElement.textContent = "";
	msgElement.classList.remove("text-danger");
	msgElement.classList.remove("text-info");

	let data = new FormData();
	data.append('avatar', document.getElementById("form__update--avatar--input").files[0]);

	const init = {
		method: 'PATCH',
		headers: {
			'X-CSRFToken': csrftoken,
		},
		body: data,
	};

	try {

		let hostnameport = "https://" + window.location.host

		const response = await fetch(hostnameport + '/api/updateavatar/', init);

		if (response.status === 400) {
			const error = await response.text();

			msgElement.textContent = error.replace(/["{}[\]]/g, '');
			msgElement.classList.add("text-danger");
			return;
		}
		if (response.status === 200) {
			const data = await response.json();

			sessionStorage.setItem("avatar", data.avatar);

			msgElement.textContent = "Your avatar was successfully updated.";
			msgElement.classList.remove("text-danger");
			msgElement.classList.add("text-info");

			window.location.reload();
		}
	} catch (e) {
		console.error(e);
	}
};

async function deleteAccount() {

	const init = {
		headers: {
			'X-CSRFToken': csrftoken,
		},
	};

	try {
		// const response = await fetch('', init);

		window.alert("Your account was sucessfully erased from our memory.");

		router("login");
	} catch (e) {
		console.error(e);
	}
};

function listenerUpdateInfo() {

	document.getElementById("update__avatar--big").src = sessionStorage.getItem("avatar") !== null ?
		sessionStorage.getItem("avatar") : "/frontend/img/person-circle-Bootstrap.svg";
	document.getElementById("update__username--big").textContent = sessionStorage.getItem("username") ?
		sessionStorage.getItem("username") : "user";
	document.getElementById("update__nickname--big").textContent = sessionStorage.getItem("nickname");

	const nicknameForm = document.getElementById("form__update--nickname");
	const passwordForm = document.getElementById("form__update--password");
	const avatarForm = document.getElementById("form__update--avatar");
	const deleteAccountBtn = document.getElementById("form__update--delete--account--btn");

	nicknameForm.addEventListener("submit", e => {
		e.preventDefault();

		updateNickname(nicknameForm);
	});

	passwordForm.addEventListener("submit", e => {
		e.preventDefault();

		updatePassword(passwordForm);
	});

	avatarForm.addEventListener("submit", e => {
		e.preventDefault();

		updateAvatar();
	});

	deleteAccountBtn.addEventListener("click", e => {
		e.preventDefault();

		deleteAccount();
	});
};

async function loadUpdateInfo() {

	csrftoken = document.cookie.split("; ").find((row) => row.startsWith("csrftoken"))?.split("=")[1];

	const init = {
		headers: {
			'Content-Type': 'application/json',
			'X-CSRFToken': csrftoken,
		}
	};

	try {

		let hostnameport = "https://" + window.location.host

		const response = await fetch(hostnameport + '/api/profile/', init);

		if (!response.ok) {
			const text = await response.text();
			throw new Error(text.replace(/["{}[\]]/g, ''));
		}

		return 1;
	} catch (e) {
		console.error("loadUpdateInfor: " + e);
		return 0;
	}
};

export default {
	listenerUpdateInfo,
	loadUpdateInfo
};
